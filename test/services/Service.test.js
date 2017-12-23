import { expect } from 'chai'
import Service from '../../services/';
describe('Service', () => {
    describe('constructor', () => {
        it('should construct', () => {
            let s = new Service();
            expect(s).to.be.a('object');
            expect(s.log).to.be.equal(undefined);
        });
        it('should take a log object and assign it as a member.', () => {
            let log = {};
            let s = new Service(log);
            expect(s.log).to.be.equal(log);
        })
    })
})