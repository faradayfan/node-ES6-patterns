import { expect } from 'chai';
import MyService from '../../../services/MyService/';
import Service from '../../../services/'


describe('MyService', () => {
    it('should construct', () => {
        let s;
        expect(s = new MyService()).not.to.throw;
    });
})