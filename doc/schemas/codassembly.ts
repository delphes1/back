import requestFunction from './requestFunction.ts';
import requestTechnology from './requestTechnology.ts';

const codassembly: Object = {
    functions: {
        created: [requestFunction],
        progress: [requestFunction],
        ended: [requestFunction],
        deny: [requestFunction]
    },
    technologies: {
        created: [requestTechnology],
        progress: [requestTechnology],
        deny: [requestTechnology]
    }
}

export default codassembly;