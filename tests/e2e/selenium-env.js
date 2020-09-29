const NodeEnvironment = require('jest-environment-node');
const { spawn } = require('child_process')

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.testPath = context.testPath;
    this.docblockPragmas = context.docblockPragmas;
  }

  async setup() {
    await super.setup();
    this.serverProc = spawn('npm', ['start'], {
      detached: true
    })
    this.serverProc.unref()
    // await someSetupTasks(this.testPath);

    // this.global.someGlobalObject = createGlobalObject();

    // // Will trigger if docblock contains @my-custom-pragma my-pragma-value
    // if (this.docblockPragmas['my-custom-pragma'] === 'my-pragma-value') {
    //   // ...
    // }
  }

  async teardown() {
    // this.global.someGlobalObject = destroyGlobalObject();
    // await someTeardownTasks();
    this.serverProc && this.serverProc.kill('SIGINT')
    await super.teardown();
  }

  // runScript(script) {
  //   return super.runScript(script);
  // }

  // async handleTestEvent(event, state) {
  //   if (event.name === 'test_start') {
  //     // ...
  //   }
  // }
}

module.exports = CustomEnvironment;