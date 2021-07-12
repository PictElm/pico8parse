(function (root, name, factory) {
  'use strict';

  var freeExports = typeof exports === 'object' && exports
    , freeModule = typeof module === 'object' && module && module.exports === freeExports && module
    , freeGlobal = typeof global === 'object' && global;
  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) root = freeGlobal;

  if (typeof define === 'function' && define.amd) define(['exports'], factory);
  else if (freeExports && !freeExports.nodeType) {
    if (freeModule) factory(freeModule.exports);
    else factory(freeExports);
  }
  else factory((root[name] = {}));
}(this, 'pico8extra', function (exports) {
  'use strict';

  exports.name = 'pico8extra';
  exports.spec = [
    {
      "source": "?a,1,2",
      "result": "[1:1] unexpected symbol '?' near '<bof>'"
    },
    {
      "source": "?\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 0
                }
              },
              "range": [
                0,
                0
              ]
            },
            "arguments": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 1
              }
            },
            "range": [
              0,
              1
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 1
          }
        },
        "range": [
          0,
          1
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?\"coucou\"\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 0
                }
              },
              "range": [
                0,
                0
              ]
            },
            "arguments": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "\"coucou\"",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 9
                  }
                },
                "range": [
                  1,
                  9
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 9
              }
            },
            "range": [
              0,
              9
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 9
          }
        },
        "range": [
          0,
          9
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "? \"coucou\"\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 0
                }
              },
              "range": [
                0,
                0
              ]
            },
            "arguments": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "\"coucou\"",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 2
                  },
                  "end": {
                    "line": 1,
                    "column": 10
                  }
                },
                "range": [
                  2,
                  10
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 10
              }
            },
            "range": [
              0,
              10
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "range": [
          0,
          10
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?a\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 0
                }
              },
              "range": [
                0,
                0
              ]
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "a",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 2
                  }
                },
                "range": [
                  1,
                  2
                ],
                "isLocal": false
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 2
              }
            },
            "range": [
              0,
              2
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 2
          }
        },
        "range": [
          0,
          2
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 1,
                "column": 1
              },
              "end": {
                "line": 1,
                "column": 2
              }
            },
            "range": [
              1,
              2
            ],
            "isLocal": false
          }
        ]
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?a",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 0
                }
              },
              "range": [
                0,
                0
              ]
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "a",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 2
                  }
                },
                "range": [
                  1,
                  2
                ],
                "isLocal": false
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 2
              }
            },
            "range": [
              0,
              2
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 2
          }
        },
        "range": [
          0,
          2
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 1,
                "column": 1
              },
              "end": {
                "line": 1,
                "column": 2
              }
            },
            "range": [
              1,
              2
            ],
            "isLocal": false
          }
        ]
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?\na",
      "result": "[2:2] unexpected symbol '?' near '<eof>'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "a()\n?a\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallStatement",
            "expression": {
              "type": "CallExpression",
              "base": {
                "type": "Identifier",
                "name": "a",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 1
                  }
                },
                "range": [
                  0,
                  1
                ],
                "isLocal": false
              },
              "arguments": [],
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 3
                }
              },
              "range": [
                0,
                3
              ]
            },
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 3
              }
            },
            "range": [
              0,
              3
            ]
          },
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 2,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 3
                }
              },
              "range": [
                4,
                3
              ]
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "a",
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 1
                  },
                  "end": {
                    "line": 2,
                    "column": 2
                  }
                },
                "range": [
                  5,
                  6
                ],
                "isLocal": false
              }
            ],
            "loc": {
              "start": {
                "line": 2,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 2
              }
            },
            "range": [
              4,
              6
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 2
          }
        },
        "range": [
          0,
          6
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 1
              }
            },
            "range": [
              0,
              1
            ],
            "isLocal": false
          }
        ]
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "a() ?a",
      "result": "[1:5] unexpected identifier 'a' near '<eof>'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?a a()",
      "result": "[1:6] unexpected symbol '?' near '('",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?a,\nb",
      "result": "[2:2] unexpected symbol '?' near '<eof>'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?(a)\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 0
                }
              },
              "range": [
                0,
                0
              ]
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "a",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 2
                  },
                  "end": {
                    "line": 1,
                    "column": 3
                  }
                },
                "range": [
                  2,
                  3
                ],
                "isLocal": false
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 4
              }
            },
            "range": [
              0,
              4
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 4
          }
        },
        "range": [
          0,
          4
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 1,
                "column": 2
              },
              "end": {
                "line": 1,
                "column": 3
              }
            },
            "range": [
              2,
              3
            ],
            "isLocal": false
          }
        ]
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?a,c\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 0
                }
              },
              "range": [
                0,
                0
              ]
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "a",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 2
                  }
                },
                "range": [
                  1,
                  2
                ],
                "isLocal": false
              },
              {
                "type": "Identifier",
                "name": "c",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 3
                  },
                  "end": {
                    "line": 1,
                    "column": 4
                  }
                },
                "range": [
                  3,
                  4
                ],
                "isLocal": false
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 4
              }
            },
            "range": [
              0,
              4
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 4
          }
        },
        "range": [
          0,
          4
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 1,
                "column": 1
              },
              "end": {
                "line": 1,
                "column": 2
              }
            },
            "range": [
              1,
              2
            ],
            "isLocal": false
          },
          {
            "type": "Identifier",
            "name": "c",
            "loc": {
              "start": {
                "line": 1,
                "column": 3
              },
              "end": {
                "line": 1,
                "column": 4
              }
            },
            "range": [
              3,
              4
            ],
            "isLocal": false
          }
        ]
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?a,x,y,c\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 0
                }
              },
              "range": [
                0,
                0
              ]
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "a",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 1
                  },
                  "end": {
                    "line": 1,
                    "column": 2
                  }
                },
                "range": [
                  1,
                  2
                ],
                "isLocal": false
              },
              {
                "type": "Identifier",
                "name": "x",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 3
                  },
                  "end": {
                    "line": 1,
                    "column": 4
                  }
                },
                "range": [
                  3,
                  4
                ],
                "isLocal": false
              },
              {
                "type": "Identifier",
                "name": "y",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 5
                  },
                  "end": {
                    "line": 1,
                    "column": 6
                  }
                },
                "range": [
                  5,
                  6
                ],
                "isLocal": false
              },
              {
                "type": "Identifier",
                "name": "c",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "range": [
                  7,
                  8
                ],
                "isLocal": false
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 8
              }
            },
            "range": [
              0,
              8
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 8
          }
        },
        "range": [
          0,
          8
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 1,
                "column": 1
              },
              "end": {
                "line": 1,
                "column": 2
              }
            },
            "range": [
              1,
              2
            ],
            "isLocal": false
          },
          {
            "type": "Identifier",
            "name": "x",
            "loc": {
              "start": {
                "line": 1,
                "column": 3
              },
              "end": {
                "line": 1,
                "column": 4
              }
            },
            "range": [
              3,
              4
            ],
            "isLocal": false
          },
          {
            "type": "Identifier",
            "name": "y",
            "loc": {
              "start": {
                "line": 1,
                "column": 5
              },
              "end": {
                "line": 1,
                "column": 6
              }
            },
            "range": [
              5,
              6
            ],
            "isLocal": false
          },
          {
            "type": "Identifier",
            "name": "c",
            "loc": {
              "start": {
                "line": 1,
                "column": 7
              },
              "end": {
                "line": 1,
                "column": 8
              }
            },
            "range": [
              7,
              8
            ],
            "isLocal": false
          }
        ]
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?(a,c)",
      "result": "[1:3] ')' expected near ','",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "?(a),(c)\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 0
                }
              },
              "range": [
                0,
                0
              ]
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "a",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 2
                  },
                  "end": {
                    "line": 1,
                    "column": 3
                  }
                },
                "range": [
                  2,
                  3
                ],
                "isLocal": false
              },
              {
                "type": "Identifier",
                "name": "c",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 6
                  },
                  "end": {
                    "line": 1,
                    "column": 7
                  }
                },
                "range": [
                  6,
                  7
                ],
                "isLocal": false
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 8
              }
            },
            "range": [
              0,
              8
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 8
          }
        },
        "range": [
          0,
          8
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 1,
                "column": 2
              },
              "end": {
                "line": 1,
                "column": 3
              }
            },
            "range": [
              2,
              3
            ],
            "isLocal": false
          },
          {
            "type": "Identifier",
            "name": "c",
            "loc": {
              "start": {
                "line": 1,
                "column": 6
              },
              "end": {
                "line": 1,
                "column": 7
              }
            },
            "range": [
              6,
              7
            ],
            "isLocal": false
          }
        ]
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "a = 1 ?a",
      "result": "[1:7] unexpected identifier 'a' near '<eof>'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "a = 2; ?a",
      "result": "[1:8] unexpected identifier 'a' near '<eof>'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "(?a)",
      "result": "[1:1] <expression> expected near '?'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "(?a\n)",
      "result": "[1:1] <expression> expected near '?'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "\n?a\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "?",
              "loc": {
                "start": {
                  "line": 2,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 0
                }
              },
              "range": [
                1,
                0
              ]
            },
            "arguments": [
              {
                "type": "Identifier",
                "name": "a",
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 1
                  },
                  "end": {
                    "line": 2,
                    "column": 2
                  }
                },
                "range": [
                  2,
                  3
                ],
                "isLocal": false
              }
            ],
            "loc": {
              "start": {
                "line": 2,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 2
              }
            },
            "range": [
              1,
              3
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 2,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 2
          }
        },
        "range": [
          1,
          3
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 2,
                "column": 1
              },
              "end": {
                "line": 2,
                "column": 2
              }
            },
            "range": [
              2,
              3
            ],
            "isLocal": false
          }
        ]
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.1",
        "ignoreStrictP8FileFormat": true
      }
    }
  ];
}));
