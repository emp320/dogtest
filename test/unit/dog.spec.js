/* eslint-disable no-unused-expressions, no-underscore-dangle */

const Dog = require('../../dst/models/dog');

const expect = require('chai').expect;
const sinon = require('sinon');

describe('Dog', () => {
  // beforeEach(() => {
  //   sinon.stub(Dog, 'find').yields(null, [{ name: 'max' }]);
  // });
  //
  // afterEach(() => {
  //   sinon.find.restore();
  // });


  describe('#feed', () => {
    it('should add 10 to dog health', () => {
      const d = new Dog({ name: 'rex',
                          age: 3,
                          health: 92,
                          toy: 'Bones' });
      // this.stub(d, 'save').yields(null, {health: 60});
      d.feed();
      expect(d.health).to.equal(100);
    });
  });

  describe('constructor', () => {
    it('should create a dog object', (done) => {
      const d = new Dog({ name: 'fido',
                          age: 3,
                          health: 100,
                          toy: 'Ball' });
      d.validate(err => {
        expect(err).to.be.undefined;
        expect(d.name).to.equal('fido');
        expect(d._id).to.be.ok;
        expect(d.dateCreated).to.be.ok;
        done();
      });
    });

    it('should not create a dog object - neg health', (done) => {
      const d = new Dog({ name: 'fido',
                          age: 3,
                          health: -50,
                          toy: 'Ball' });
      d.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });

    it('should not create a dog object - name missing', (done) => {
      const d = new Dog({ age: 3,
                          health: 50,
                          toy: 'Ball' });
      d.validate(err => {
        // console.log('err-name missing:', err);
        expect(err).to.be.ok;
        done();
      });
    });

    it('should not create a dog object - name only 2 letters', (done) => {
      const d = new Dog({ name: 'ab',
                          age: 3,
                          health: 50,
                          toy: 'Ball' });
      d.validate(err => {
        // console.log('err-name missing:', err);
        expect(err).to.be.ok;
        done();
      });
    });

    it('should not create a dog object - not approved toy', (done) => {
      const d = new Dog({ name: 'Cocoa',
                          age: 3,
                          health: 50,
                          toy: 'Cat' });
      d.validate(err => {
        // console.log('err-name missing:', err);
        expect(err).to.be.ok;
        done();
      });
    });
    it('should not create a dog object - duplicate dog found', sinon.test(function (done) {
      this.stub(Dog, 'find').yields(null, [{ name: 'max' }]);
      const d = new Dog({ name: 'max',
                          age: 3,
                          health: 50,
                          toy: 'Ball' });
      d.validate(err => {
        // console.log('err-name missing:', err);
        expect(err).to.be.ok;
        sinon.assert.calledWith(Dog.find, { name: 'max' });
        done();
      });
    }));
  });
});
