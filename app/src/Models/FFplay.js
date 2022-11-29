const { spawnSync, execSync } = require('child_process');
const { ffplayData } = require('../staticData/playersData');
const { ffmpegbmData } = require('../staticData/playersData');
var path = require('path');
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
  constructor(opts = [" -loglevel quiet -f decklink -pix_fmt uyvy422"]) {
    this.#opts = opts;
    this.#playerPath = ffmpegbmData.path;
  }

  // eslint-disable-next-line class-methods-use-this
  start() { }
  load(file) {
    var sourceFile = path.basename(file).split('.y4m')[0] + '_R0.y4m';
    //ffmpeg -f lavfi -i color=gray:4096x2160:d=30,format=rgb24 -f decklink
    //-pix_fmt uyvy422 -r 24 -s 4096x2160  -an  'DeckLink 8K Pro (1)'
    //TODO: Remove Hardcoding
    var cmd_parser = 'bash /home/mindfreeze/dev/BVI-SVQA/app/params.sh ' + '/home/mindfreeze/dev/BVI-SVQA/app/converted/source/' + sourceFile
    // 0 is FPS, 1 is RES
    const param_vals = execSync(cmd_parser).toString().split(',');
    var grayCmd = this.#playerPath + " -f lavfi -i color=555555:4096x2160:d=5,format=rgb24 -f decklink -pix_fmt uyvy422 -r " + param_vals[0] + " -s " + param_vals[1] + "  -an 'DeckLink 8K Pro (1)' -loglevel quiet ";
    execSync(grayCmd);
    var ffmpegCmd = this.#playerPath + ' -i ' + file + this.#opts + ' -r ' + param_vals[0] + ' -s ' + param_vals[1] + " -an 'DeckLink 8K Pro (1)'  ";
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
