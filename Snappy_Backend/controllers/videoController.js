const cloudinary = require("cloudinary").v2;
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs").promises;
const ffmpegPath = require("ffmpeg-static");
const gTTS = require("gtts");

// Measurement tools
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

/**
 * 📸 PEXELS SERVICE
 */
const getImagesFromPexels = async (keywords = []) => {
  try {
    const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));
    const query = keywords && keywords.length ? keywords : ["nature"];
    const requests = query.map((keyword) =>
      fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(keyword)}&per_page=20&orientation=portrait`,
        { headers: { Authorization: "HvwhFjppzjtm8dvsUlCZH1ixWB0UeNIqtV32BS7Tu0SB03ucuirZZG2Z" } }
      ).then((res) => res.json())
    );
    const responses = await Promise.all(requests);
    return responses.flatMap((data) => (data.photos || []).map((p) => p.src.portrait));
  } catch (error) {
    return [];
  }
};

/**
 * 🔊 VOICE GENERATOR
 */
const generateSpeech = async (text, outputDir) => {
  return new Promise((resolve, reject) => {
    const gtts = new gTTS(text, "en");
    const audioPath = path.join(outputDir, `voice_${Date.now()}.mp3`);
    gtts.save(audioPath, (err) => {
      if (err) return reject(err);
      resolve(audioPath);
    });
  });
};

/**
 * 📝 DYNAMIC SUBTITLE GENERATOR
 */
const generateSRT = async (text, outputDir, totalDuration) => {
  const srtPath = path.join(outputDir, `subs_${Date.now()}.srt`);
  const words = text.split(" ");
  const wordsPerChunk = 4;
  let srtContent = "";

  const totalChunks = Math.ceil(words.length / wordsPerChunk);
  const timePerChunk = totalDuration / totalChunks;

  for (let i = 0, chunkIdx = 1; i < words.length; i += wordsPerChunk, chunkIdx++) {
    const start = (chunkIdx - 1) * timePerChunk;
    const end = chunkIdx * timePerChunk;

    const formatTime = (seconds) => {
      const date = new Date(0);
      date.setSeconds(seconds);
      const ms = Math.floor((seconds % 1) * 1000);
      return date.toISOString().substr(11, 8) + "," + ms.toString().padStart(3, "0");
    };

    const chunkText = words.slice(i, i + wordsPerChunk).join(" ").toUpperCase();
    srtContent += `${chunkIdx}\n${formatTime(start)} --> ${formatTime(end)}\n${chunkText}\n\n`;
  }

  await fs.writeFile(srtPath, srtContent);
  return srtPath;
};

/**
 * 📸 DOWNLOADER
 */
const downloadImages = async (urls, dir) => {
  const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));
  const ps = urls.map(async (url, i) => {
    try {
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      const p = path.join(dir, `img_${i}_${Date.now()}.jpg`);
      await fs.writeFile(p, Buffer.from(buffer));
      return p;
    } catch { return null; }
  });
  const rs = await Promise.all(ps);
  return rs.filter((f) => f !== null);
};

/**
 * 🎬 VIDEO GENERATOR
 */
const generateSlideshowVideo = async (imageUrls, scriptText) => {
  const tempDir = path.join(process.cwd(), "temp");
  await fs.mkdir(tempDir, { recursive: true });

  // ✅ PATH TO YOUR GRADIENT IMAGE (Up one level, then into img folder)
  const gradientPath = path.join(__dirname, "..", "img", "gradient.png");

  // 1. Prepare Audio
  const audioPath = await generateSpeech(scriptText, tempDir);

  // 2. Measure Duration
  const duration = await new Promise((resolve) => {
    ffmpeg.ffprobe(audioPath, (err, metadata) => {
      resolve(metadata.format.duration || 10);
    });
  });

  // 3. Prepare Subtitles & Assets
  const srtPath = await generateSRT(scriptText, tempDir, duration);
  const localImages = await downloadImages(imageUrls, tempDir);
  const durationPerImg = (duration / localImages.length).toFixed(2);
  const outputPath = path.join(tempDir, `final_${Date.now()}.mp4`);
  
  // FFmpeg subtitle path escape
  const escapedSrtPath = srtPath.replace(/\\/g, "/").replace(/:/g, "\\:");

  return new Promise((resolve, reject) => {
    let command = ffmpeg();

    // Inputs: Background Images
    localImages.forEach((img) => {
      command = command.input(img).inputOptions(["-loop 1", `-t ${durationPerImg}`]);
    });

    // Input: Audio
    command.input(audioPath);

    // Input: Gradient PNG
    command.input(gradientPath);

    const audioIdx = localImages.length;
    const gradientIdx = localImages.length + 1;

    // Filter Logic
    const filterChain = localImages.map((_, i) => `[${i}:v]scale=360:640:force_original_aspect_ratio=decrease,pad=360:640:(ow-iw)/2:(oh-ih)/2[v${i}]`).join(';');
    const concatChain = localImages.map((_, i) => `[v${i}]`).join('') + `concat=n=${localImages.length}:v=1:a=0[v_bg]`;

    command
      .complexFilter([
        filterChain,
        concatChain,
        // Layering: BG -> Gradient Overlay -> Subtitles
        `[${gradientIdx}:v]scale=360:-1[grad]; [v_bg][grad]overlay=0:H-h[v_with_grad]`,
        `[v_with_grad]subtitles='${escapedSrtPath}':force_style='FontName=Poppins,FontSize=10,PrimaryColour=&H0000FFFF,Alignment=2,MarginV=40'[outv]`
      ])
      .outputOptions([
        "-map [outv]",
        `-map ${audioIdx}:a`,
        "-c:v libx264",
        "-preset ultrafast",
        "-crf 28",
        `-t ${duration}`,
        "-pix_fmt yuv420p",
        "-y"
      ])
      .save(outputPath)
      .on("end", async () => {
        // Cleanup temp assets
        for (const f of [...localImages, audioPath, srtPath]) await fs.unlink(f).catch(() => {});
        resolve(outputPath);
      })
      .on("error", (err) => reject(err));
  });
};

/**
 * 🚀 CONTROLLER
 */
const getVideoController = async (req, res) => {
  try {
    const { keywords, script } = req.body;
    const urls = await getImagesFromPexels(keywords);
    const finalUrls = urls.slice(0, 15);

    if (!finalUrls.length) return res.status(400).json({ error: "No images found" });

    const videoPath = await generateSlideshowVideo(finalUrls, script);

    const upload = await cloudinary.uploader.upload(videoPath, {
      resource_type: "video",
      folder: "snappy",
      cloud_name: "dbwyexls4",
      api_key: "136468721341561",
      api_secret: "n60ycSppygc27sGienbw6LHCp7A",
    });

    await fs.unlink(videoPath).catch(() => {});
    return res.json({ success: true, url: upload.secure_url });
  } catch (err) {
    console.error("Render Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getVideoController };