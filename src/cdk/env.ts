import { MiraConfig, Account } from '../config/mira-config'

/** @ignore - Excluded from documentation generation. */
// eslint-disable-next-line
const minimist = require('minimist')

/** @ignore - Excluded from documentation generation. */
const args = minimist(process.argv.slice(2))

/**
 * @class Responsible for establishing the Mira environment.  This includes
 * assisting with the bootstrapping process (reading and parsing CLI args) and
 * the local system configuration including AWS credentials.
 */
export default class MiraEnv {
    env: Account
    static instance: MiraEnv
    constructor() {
        if (!MiraEnv.instance) {
            MiraEnv.instance = this
        } else if (args.env !== 'test') {
            console.warn('MiraEnv was instantiated twice outside a testing environment'
                + '.  This will likely cause unknown behavior.')
        }
    }

    initialize() {
        this.parseEnv()
    }

    parseEnv() {
        if (!args.env && process.env.NODE_ENV) {
            args.env = process.env.NODE_ENV
        } else if (!args.env) {
            console.warn('Warning: Environment not specified, defauling to dev.')
            args.env = 'dev'
        }
        // TODO: Perhaps we migrate this fn to this class?
        this.env = MiraConfig.getEnvironment(args.env)
        return this.env
    }
}
new MiraEnv()