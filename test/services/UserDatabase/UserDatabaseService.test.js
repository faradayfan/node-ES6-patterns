import { expect } from 'chai';
import UserDatabaseService from '../../../src/services/UserDatabase/';
import Service from '../../../src/services/'


describe('MyService', () => {
    describe('constructor', () => {
        it('should construct', () => {
            let s;
            expect(s = new UserDatabaseService()).not.to.throw;
        });
        it('should have a log object from super', () => {
            let log = {};
            let s = new UserDatabaseService(log);
            expect(s.log).to.be.equal(log);
        })
    });

})