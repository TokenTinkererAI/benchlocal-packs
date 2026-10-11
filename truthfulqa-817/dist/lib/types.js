"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.letterCountOf = letterCountOf;
/** How many answer choices a question presents (2-13). */
function letterCountOf(question) {
    return question.options.length;
}
