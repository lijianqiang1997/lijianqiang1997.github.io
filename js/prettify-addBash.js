   /* 增加 bash 高亮规则 */
   (function() {
    /* 不完善的实现 */
    PR['registerLangHandler'](
        PR['createSimpleLexer'](
            [
             // Whitespace
             [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
             // A double or single quoted, possibly multi-line, string.
             [PR['PR_STRING'],      /^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/, null,
              '"\'']
            ],
            [
             [PR['PR_COMMENT'], /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, '#'],
             [PR['PR_KEYWORD'], /[^\.\/]?(?:ls|cd|chown|chmod|sudo|su|vi|vim|cat|touch|tar|scp|cp|ssh|useradd|passwd|apt\-get|export|source|echo|mv|mkdir|rm)(\s)+/i, null],
             // [PR['PR_LITERAL'],
              // /^([^a-zA-Z0-9](-(\w)*))|\$(\w)*/i],
             // An identifier
             [PR['PR_PLAIN'], /^[a-z_][\w-]*/i],
             // A run of punctuation
             // [PR['PR_PUNCTUATION'], /^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0+\-\"\']*/]
            ]),
        ['bash', 'sh', 'shell']);
}());