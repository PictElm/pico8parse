describe('tableconstructors', function() {
  it('a = {                                   -- FAIL', function() {
    expect(parser.parse('a = {', {wait:true}).end).to.throwError("[1:5] '}' expected near '<eof>'");
  });
  it('a = {}', function() {
    expect(parser.parse('a = {}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": []
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = {,}                                 -- FAIL', function() {
    expect(parser.parse('a = {,}', {wait:true}).end).to.throwError("[1:5] '}' expected near ','");
  });
  it('a = {;}                                 -- FAIL', function() {
    expect(parser.parse('a = {;}', {wait:true}).end).to.throwError("[1:5] '}' expected near ';'");
  });
  it('a = {,,}                                -- FAIL', function() {
    expect(parser.parse('a = {,,}', {wait:true}).end).to.throwError("[1:5] '}' expected near ','");
  });
  it('a = {;;}                                -- FAIL', function() {
    expect(parser.parse('a = {;;}', {wait:true}).end).to.throwError("[1:5] '}' expected near ';'");
  });
  it('a = {{                                  -- FAIL', function() {
    expect(parser.parse('a = {{', {wait:true}).end).to.throwError("[1:6] '}' expected near '<eof>'");
  });
  it('a = {{{}}}', function() {
    expect(parser.parse('a = {{{}}}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "TableConstructorExpression",
                    "fields": [
                      {
                        "type": "TableValue",
                        "value": {
                          "type": "TableConstructorExpression",
                          "fields": []
                        }
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = {{},{},{{}},}', function() {
    expect(parser.parse('a = {{},{},{{}},}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "TableConstructorExpression",
                    "fields": []
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "TableConstructorExpression",
                    "fields": []
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "TableConstructorExpression",
                    "fields": [
                      {
                        "type": "TableValue",
                        "value": {
                          "type": "TableConstructorExpression",
                          "fields": []
                        }
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { 1 }', function() {
    expect(parser.parse('a = { 1 }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { 1, }', function() {
    expect(parser.parse('a = { 1, }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { 1; }', function() {
    expect(parser.parse('a = { 1; }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { 1, 2 }', function() {
    expect(parser.parse('a = { 1, 2 }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Literal",
                    "value": 2,
                    "raw": "2"
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { a, b, c, }', function() {
    expect(parser.parse('a = { a, b, c, }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Identifier",
                    "name": "a"
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Identifier",
                    "name": "b"
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Identifier",
                    "name": "c"
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { true; false, nil; }', function() {
    expect(parser.parse('a = { true; false, nil; }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Literal",
                    "value": true,
                    "raw": "true"
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Literal",
                    "value": false,
                    "raw": "false"
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Literal",
                    "value": null,
                    "raw": "nil"
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { a.b, a[b]; a:c(), }', function() {
    expect(parser.parse('a = { a.b, a[b]; a:c(), }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "MemberExpression",
                    "indexer": ".",
                    "identifier": {
                      "type": "Identifier",
                      "name": "b"
                    },
                    "base": {
                      "type": "Identifier",
                      "name": "a"
                    }
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "IndexExpression",
                    "base": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "index": {
                      "type": "Identifier",
                      "name": "b"
                    }
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "CallExpression",
                    "base": {
                      "type": "MemberExpression",
                      "indexer": ":",
                      "identifier": {
                        "type": "Identifier",
                        "name": "c"
                      },
                      "base": {
                        "type": "Identifier",
                        "name": "a"
                      }
                    },
                    "arguments": []
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { 1 + 2, a > b, "a" or "b" }', function() {
    expect(parser.parse('a = { 1 + 2, a > b, "a" or "b" }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                      "type": "Literal",
                      "value": 1,
                      "raw": "1"
                    },
                    "right": {
                      "type": "Literal",
                      "value": 2,
                      "raw": "2"
                    }
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "BinaryExpression",
                    "operator": ">",
                    "left": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "b"
                    }
                  }
                },
                {
                  "type": "TableValue",
                  "value": {
                    "type": "LogicalExpression",
                    "operator": "or",
                    "left": {
                      "type": "Literal",
                      "value": "a",
                      "raw": "\"a\""
                    },
                    "right": {
                      "type": "Literal",
                      "value": "b",
                      "raw": "\"b\""
                    }
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { a=1, }', function() {
    expect(parser.parse('a = { a=1, }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableKeyString",
                  "key": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "value": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { a=1, b="foo", c=nil }', function() {
    expect(parser.parse('a = { a=1, b="foo", c=nil }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableKeyString",
                  "key": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "value": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  }
                },
                {
                  "type": "TableKeyString",
                  "key": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "value": {
                    "type": "Literal",
                    "value": "foo",
                    "raw": "\"foo\""
                  }
                },
                {
                  "type": "TableKeyString",
                  "key": {
                    "type": "Identifier",
                    "name": "c"
                  },
                  "value": {
                    "type": "Literal",
                    "value": null,
                    "raw": "nil"
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { a                                 -- FAIL', function() {
    expect(parser.parse('a = { a', {wait:true}).end).to.throwError("[1:7] '}' expected near '<eof>'");
  });
  it('a = { a=                                -- FAIL', function() {
    expect(parser.parse('a = { a=', {wait:true}).end).to.throwError("[1:8] '}' expected near '<eof>'");
  });
  it('a = { a=,                               -- FAIL', function() {
    expect(parser.parse('a = { a=,', {wait:true}).end).to.throwError("[1:9] '}' expected near '<eof>'");
  });
  it('a = { a=;                               -- FAIL', function() {
    expect(parser.parse('a = { a=;', {wait:true}).end).to.throwError("[1:9] '}' expected near '<eof>'");
  });
  it('a = { 1, a="foo"                        -- FAIL', function() {
    expect(parser.parse('a = { 1, a="foo"', {wait:true}).end).to.throwError("[1:16] '}' expected near '<eof>'");
  });
  it('a = { 1, a="foo"; b={}, d=true; }', function() {
    expect(parser.parse('a = { 1, a="foo"; b={}, d=true; }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  }
                },
                {
                  "type": "TableKeyString",
                  "key": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "value": {
                    "type": "Literal",
                    "value": "foo",
                    "raw": "\"foo\""
                  }
                },
                {
                  "type": "TableKeyString",
                  "key": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "value": {
                    "type": "TableConstructorExpression",
                    "fields": []
                  }
                },
                {
                  "type": "TableKeyString",
                  "key": {
                    "type": "Identifier",
                    "name": "d"
                  },
                  "value": {
                    "type": "Literal",
                    "value": true,
                    "raw": "true"
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { [                                 -- FAIL', function() {
    expect(parser.parse('a = { [', {wait:true}).end).to.throwError("[1:7] ']' expected near '<eof>'");
  });
  it('a = { [1                                -- FAIL', function() {
    expect(parser.parse('a = { [1', {wait:true}).end).to.throwError("[1:8] ']' expected near '<eof>'");
  });
  it('a = { [1]                               -- FAIL', function() {
    expect(parser.parse('a = { [1]', {wait:true}).end).to.throwError("[1:9] '=' expected near '<eof>'");
  });
  it('a = { [a]=                              -- FAIL', function() {
    expect(parser.parse('a = { [a]=', {wait:true}).end).to.throwError("[1:10] <expression> expected near '<eof>'");
  });
  it('a = { ["foo"]="bar" }', function() {
    expect(parser.parse('a = { ["foo"]="bar" }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableKey",
                  "key": {
                    "type": "Literal",
                    "value": "foo",
                    "raw": "\"foo\""
                  },
                  "value": {
                    "type": "Literal",
                    "value": "bar",
                    "raw": "\"bar\""
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { [1]=a, [2]=b, }', function() {
    expect(parser.parse('a = { [1]=a, [2]=b, }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableKey",
                  "key": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  },
                  "value": {
                    "type": "Identifier",
                    "name": "a"
                  }
                },
                {
                  "type": "TableKey",
                  "key": {
                    "type": "Literal",
                    "value": 2,
                    "raw": "2"
                  },
                  "value": {
                    "type": "Identifier",
                    "name": "b"
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
  it('a = { true, a=1; ["foo"]="bar", }', function() {
    expect(parser.parse('a = { true, a=1; ["foo"]="bar", }')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "AssignmentStatement",
          "variables": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "init": [
            {
              "type": "TableConstructorExpression",
              "fields": [
                {
                  "type": "TableValue",
                  "value": {
                    "type": "Literal",
                    "value": true,
                    "raw": "true"
                  }
                },
                {
                  "type": "TableKeyString",
                  "key": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "value": {
                    "type": "Literal",
                    "value": 1,
                    "raw": "1"
                  }
                },
                {
                  "type": "TableKey",
                  "key": {
                    "type": "Literal",
                    "value": "foo",
                    "raw": "\"foo\""
                  },
                  "value": {
                    "type": "Literal",
                    "value": "bar",
                    "raw": "\"bar\""
                  }
                }
              ]
            }
          ]
        }
      ],
      "comments": []
    });
  });
});