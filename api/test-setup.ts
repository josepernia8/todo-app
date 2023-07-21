import * as tsNode from 'ts-node'

tsNode.register({
  transpileOnly: true,
  compilerOptions: {
    module: 'CommonJS',
  },
});
