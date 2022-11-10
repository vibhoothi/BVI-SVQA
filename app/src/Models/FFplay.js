const { spawnSync } = require('child_process');
const { ffplayData } = require('../staticData/playersData');
const { ffmpegbmData } = require('../staticData/playersData');

class FFplay {
  #opts;
  #playerPath;
  constructor(opts = ['-autoexit', '-fs']) {
    this.#opts = opts;
    this.#playerPath = ffplayData.path;
  }

  // eslint-disable-next-line class-methods-use-this
  start() {}

  load(file) {
    spawnSync(this.#playerPath, [file, ...this.#opts], {
      stdio: 'ignore',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  quit() {}
}

module.exports = FFplay;

class FFmpegBM {
  #opts;
  #playerPath;
  constructor(opts = [" -f decklink -pix_fmt uyvy422 -r 30 -s 3840x2160 -an 'DeckLink 8K Pro (1)' -loglevel quiet"]) {
    this.#opts = opts;
    this.#playerPath = ffmpegbmData.path;
  }

  // eslint-disable-next-line class-methods-use-this
  start() { }

  load(file) {
    var ffmpegCmd = this.#playerPath + ' -i ' + file + this.#opts;
    console.debug(ffmpegCmd)
    var spawnHandler = spawnSync(ffmpegCmd, {
      shell: true,
      stdio: [process.stdin, process.stdout, process.stderr],
    });
    if (spawnHandler.stderr) {
      console.log("Command:", ffmpegCmd);
      console.log("Error", spawnHandler.stderr, spawnHandler.status, spawnHandler.stdout);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  quit() { }
}

module.exports = FFmpegBM;
