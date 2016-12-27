var chai = require('chai');
var expect = chai.expect;

var boardService = require('../../src/services/board.service.js');
var messageService = require('../../src/services/message.service.js');

describe('MessageService: ', function() {

    beforeEach(function () {
        boardService.clear();
    });

    describe('findMessages', function () {

        it('should return null if no board exists', function() {
            var messages = messageService.findMessages("unknown");
            expect(messages).to.equal(null);
        });

        it('should return messages from board', function() {
            boardService.createBoard("my-board");
            var messages = messageService.findMessages("my-board");
            expect(messages).to.not.equal(null);
        });
    });

    describe('findMessage', function () {

        it('should return null if no board exists', function() {
            // no board created!
            var message = messageService.findMessage("unknown", "message-id");
            expect(message).to.equal(null);
        });

        it('should return null if no message exists', function() {
            var board = boardService.createBoard("my-board");
            // no message created!
            var message = messageService.findMessage("my-board", "unknown");
            expect(message).to.equal(null);
        });

        it('should return message', function() {
            boardService.createBoard("my-board");
            var message = messageService.createMessage("my-board", "This is a test");
            var foundMessage = messageService.findMessage("my-board", message.id);
            expect(foundMessage).to.not.equal(null);
            expect(foundMessage).to.equal(message);
        });
    });

    describe('createMessage', function () {

        it('should create new message', function() {
            boardService.createBoard("my-board");
            var message = messageService.createMessage("my-board", "This is a test");
            expect(message).to.not.equal(null);
        });

        it('should create new message with given text', function() {
            boardService.createBoard("my-board");
            var message = messageService.createMessage("my-board", "This is a test");
            expect(message.text).to.equal("This is a test");
        });

        it('should create new message with creation date', function() {
            boardService.createBoard("my-board");
            var message = messageService.createMessage("my-board", "This is a test");
            expect(message.date).to.be.ok;
        });

        it('should create new message with 0 votes', function() {
            boardService.createBoard("my-board");
            var message = messageService.createMessage("my-board", "This is a test");
            expect(message.votes).to.equal(0);
        });

        it('should create new message with an ID', function() {
            boardService.createBoard("my-board");
            var message = messageService.createMessage("my-board", "This is a test");
            expect(message.id).to.be.ok;
            expect(message.id.length).to.equal(8);
        });
    });

    describe('deleteMessage', function () {

        it('should delete a message', function () {
            var board = boardService.createBoard("my-board");
            var message = messageService.createMessage("my-board", "This is a text");

            expect(messageService.findMessages("my-board").length).to.equal(1);
            messageService.deleteMessage("my-board", message.id);
            expect(messageService.findMessages("my-board").length).to.equal(0);
        });

        it('should return the deleted message', function () {
            var board = boardService.createBoard("my-board");
            var message = messageService.createMessage("my-board", "This is a text");
            var deletedMessage = messageService.deleteMessage("my-board", message.id);

            expect(deletedMessage.text).to.equal("This is a text");
        });

        it('should return null if board is not found', function () {
            // no board created!
            var message = messageService.deleteMessage("unknwon-board", "some-id");
            expect(message).to.equal(null);
        });

        it('should return null if message is not found', function () {
            boardService.createBoard("my-board");
            // no message created!
            var message = messageService.deleteMessage("my-board", "some-id");
            expect(message).to.equal(null);
        });
    });
});