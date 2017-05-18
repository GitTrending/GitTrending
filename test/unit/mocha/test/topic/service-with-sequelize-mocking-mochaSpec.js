/**
 * Test around the @{TopicService}
 *
 * @module test/topic/service
 */

'use strict';

const chai = require('chai');
const sinon = require('sinon');
const path = require('path');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;

describe('Topic - TopicService (using sequelizeMockingMocha) - ', function () {
    const Database = require('../../lib/database');
    const TopicService = require('../../lib/topic/service');
    const Topic = require('../../lib/topic/model');

    // Basic configuration: create a sinon sandbox for testing
    let sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox && sandbox.restore();
    });

    // Load fake data for the users
    sequelizeMockingMocha(
        Database.getInstance(),
        path.resolve(path.join(__dirname, './fake-topics-database.json')),
        { 'logging': false }
    );

    it('the service shall exist', function () {
       chai.expect(TopicService).to.exist;
    });

    describe('and the method findAll shall ', function () {
        it('exist', function () {
           chai.expect(TopicService.findAll).to.exist;
        });

        it('shall returns an array of user', function () {
            return TopicService
                .findAll()
                .then(function (topics) {
                    chai.expect(topics).deep.equals([{
                        "id": 1,
                        "topic_name": "JavaScript"
                    }]);
                });
        });
    });

    describe('and the method find shall ', function () {
        it('exist', function () {
            chai.expect(TopicService.find).to.exist;
        });

        it('shall return a topic if we can', function () {
            let findByIdSpy = sandbox.spy(Topic, 'findById');

            return TopicService
                .find(1)
                .then(function (topic) {
                    chai.expect(findByIdSpy.called).to.be.true;
                    chai.expect(findByIdSpy.calledOnce).to.be.true;
                    chai.expect(findByIdSpy.calledWith(1)).to.be.true;

                    chai.expect(topic).deep.equals({
                        "id": 1,
                        "topic_name": "JavaScript"
                    });
                });
        });

        it('shall return null if not found', function () {
            return TopicService
                .find(-1)
                .then(function (topic) {
                    chai.expect(topic).to.be.null;
                });
        });
    });
});
