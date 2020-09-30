const NodeEnvironment = require('jest-environment-node');
const { spawn } = require('child_process')

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.testPath = context.testPath;
    this.docblockPragmas = context.docblockPragmas;
  }

  async setup() {
    console.log('setting up')
    await super.setup();
    this.serverProc = spawn('npm', ['start'], {
      detached: true
    })
    this.serverProc.unref()
  }

  async teardown() {
    console.log('tearing down')
    this.serverProc && this.serverProc.kill('SIGINT')
    await super.teardown();
  }
}

module.exports = CustomEnvironment;