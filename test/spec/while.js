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
}(this, 'while', function (exports) {
  'use strict';

  exports.name = 'while';
  exports.spec = [
    {
      "source": "while",
      "result": "[1:5] <expression> expected near '<eof>'"
    },
    {
      "source": "while do",
      "result": "[1:6] <expression> expected near 'do'"
    },
    {
      "source": "while =",
      "result": "[1:6] <expression> expected near '='"
    },
    {
      "source": "while 1 do",
      "result": "[1:10] 'end' expected near '<eof>'"
    },
    {
      "source": "while 1 do end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "range": [
              0,
              14
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
            "column": 14
          }
        },
        "range": [
          0,
          14
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "while 1 do local a end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "LocalStatement",
                "variables": [
                  {
                    "type": "Identifier",
                    "name": "a",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 17
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "range": [
                      17,
                      18
                    ],
                    "isLocal": true
                  }
                ],
                "init": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "range": [
                  11,
                  18
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
                "column": 22
              }
            },
            "range": [
              0,
              22
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
            "column": 22
          }
        },
        "range": [
          0,
          22
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "while 1 do local a local b end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "LocalStatement",
                "variables": [
                  {
                    "type": "Identifier",
                    "name": "a",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 17
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "range": [
                      17,
                      18
                    ],
                    "isLocal": true
                  }
                ],
                "init": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "range": [
                  11,
                  18
                ]
              },
              {
                "type": "LocalStatement",
                "variables": [
                  {
                    "type": "Identifier",
                    "name": "b",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 25
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "range": [
                      25,
                      26
                    ],
                    "isLocal": true
                  }
                ],
                "init": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 26
                  }
                },
                "range": [
                  19,
                  26
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
                "column": 30
              }
            },
            "range": [
              0,
              30
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
            "column": 30
          }
        },
        "range": [
          0,
          30
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "while 1 do local a; local b; end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "LocalStatement",
                "variables": [
                  {
                    "type": "Identifier",
                    "name": "a",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 17
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "range": [
                      17,
                      18
                    ],
                    "isLocal": true
                  }
                ],
                "init": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "range": [
                  11,
                  18
                ]
              },
              {
                "type": "LocalStatement",
                "variables": [
                  {
                    "type": "Identifier",
                    "name": "b",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 26
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "range": [
                      26,
                      27
                    ],
                    "isLocal": true
                  }
                ],
                "init": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 20
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "range": [
                  20,
                  27
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
                "column": 32
              }
            },
            "range": [
              0,
              32
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
            "column": 32
          }
        },
        "range": [
          0,
          32
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "while 1 do 2 end",
      "result": "[1:11] unexpected number '2' near 'end'"
    },
    {
      "source": "while 1 do \"foo\" end",
      "result": "[1:11] unexpected string '\"foo\"' near 'end'"
    },
    {
      "source": "while true do end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "BooleanLiteral",
              "value": true,
              "raw": "true",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 6
                },
                "end": {
                  "line": 1,
                  "column": 10
                }
              },
              "range": [
                6,
                10
              ]
            },
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 17
              }
            },
            "range": [
              0,
              17
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
            "column": 17
          }
        },
        "range": [
          0,
          17
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "while 1 do ; end",
      "result": "[1:11] unexpected symbol ';' near 'end'"
    },
    {
      "source": "while 1 do while",
      "result": "[1:16] <expression> expected near '<eof>'"
    },
    {
      "source": "while 1 end",
      "result": "[1:8] 'do' expected near 'end'"
    },
    {
      "source": "while 1 2 do",
      "result": "[1:8] 'do' expected near '2'"
    },
    {
      "source": "while 1 = 2 do",
      "result": "[1:8] 'do' expected near '='"
    },
    {
      "source": "while 1 do return end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "ReturnStatement",
                "arguments": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 17
                  }
                },
                "range": [
                  11,
                  17
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
                "column": 21
              }
            },
            "range": [
              0,
              21
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
            "column": 21
          }
        },
        "range": [
          0,
          21
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "while 1 do return return end",
      "result": "[1:18] 'end' expected near 'return'"
    },
    {
      "source": "while 1 do do end end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "DoStatement",
                "body": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 17
                  }
                },
                "range": [
                  11,
                  17
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
                "column": 21
              }
            },
            "range": [
              0,
              21
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
            "column": 21
          }
        },
        "range": [
          0,
          21
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "while 1 do do return end end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "DoStatement",
                "body": [
                  {
                    "type": "ReturnStatement",
                    "arguments": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "range": [
                      14,
                      20
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 24
                  }
                },
                "range": [
                  11,
                  24
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
                "column": 28
              }
            },
            "range": [
              0,
              28
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
            "column": 28
          }
        },
        "range": [
          0,
          28
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "while 1 do break end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "BreakStatement",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 16
                  }
                },
                "range": [
                  11,
                  16
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
                "column": 20
              }
            },
            "range": [
              0,
              20
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
            "column": 20
          }
        },
        "range": [
          0,
          20
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "while 1 do break break end",
      "result": "[1:17] 'end' expected near 'break'"
    },
    {
      "source": "while 1 do do break end end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "DoStatement",
                "body": [
                  {
                    "type": "BreakStatement",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "range": [
                      14,
                      19
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "range": [
                  11,
                  23
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
                "column": 27
              }
            },
            "range": [
              0,
              27
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
            "column": 27
          }
        },
        "range": [
          0,
          27
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "while 1 do ; end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 16
              }
            },
            "range": [
              0,
              16
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
            "column": 16
          }
        },
        "range": [
          0,
          16
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "5.2"
      }
    },
    {
      "source": "while 1 do break break end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "BreakStatement",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 16
                  }
                },
                "range": [
                  11,
                  16
                ]
              },
              {
                "type": "BreakStatement",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 17
                  },
                  "end": {
                    "line": 1,
                    "column": 22
                  }
                },
                "range": [
                  17,
                  22
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
                "column": 26
              }
            },
            "range": [
              0,
              26
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
            "column": 26
          }
        },
        "range": [
          0,
          26
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "5.2"
      }
    },
    {
      "source": "while (1)",
      "result": "[1:9] 'do' expected near ')'",
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
      "source": "while (1);",
      "result": "[1:10] 'do' expected near ';'",
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
      "source": "while (1) local a = 1\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "LocalStatement",
                "variables": [
                  {
                    "type": "Identifier",
                    "name": "a",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "range": [
                      16,
                      17
                    ],
                    "isLocal": true
                  }
                ],
                "init": [
                  {
                    "type": "NumericLiteral",
                    "value": 1,
                    "raw": "1",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 20
                      },
                      "end": {
                        "line": 1,
                        "column": 21
                      }
                    },
                    "range": [
                      20,
                      21
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 10
                  },
                  "end": {
                    "line": 1,
                    "column": 21
                  }
                },
                "range": [
                  10,
                  21
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
                "column": 0
              }
            },
            "range": [
              0,
              22
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
            "column": 0
          }
        },
        "range": [
          0,
          22
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
      "source": "while (1) local a = 1",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [
              {
                "type": "LocalStatement",
                "variables": [
                  {
                    "type": "Identifier",
                    "name": "a",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "range": [
                      16,
                      17
                    ],
                    "isLocal": true
                  }
                ],
                "init": [
                  {
                    "type": "NumericLiteral",
                    "value": 1,
                    "raw": "1",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 20
                      },
                      "end": {
                        "line": 1,
                        "column": 21
                      }
                    },
                    "range": [
                      20,
                      21
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 10
                  },
                  "end": {
                    "line": 1,
                    "column": 21
                  }
                },
                "range": [
                  10,
                  21
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
                "column": 21
              }
            },
            "range": [
              0,
              21
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
            "column": 21
          }
        },
        "range": [
          0,
          21
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
      "source": "while (1) do end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 16
              }
            },
            "range": [
              0,
              16
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
            "column": 16
          }
        },
        "range": [
          0,
          16
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
      "source": "while (1) do\nend",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 3
              }
            },
            "range": [
              0,
              16
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
            "column": 3
          }
        },
        "range": [
          0,
          16
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
      "source": "while (1)\ndo\nend",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 3
              }
            },
            "range": [
              0,
              16
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 3
          }
        },
        "range": [
          0,
          16
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
      "source": "function f()while (1) local a = 1 end",
      "result": "[1:22] 'do' expected near 'local'",
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
      "source": "function f()while (1) local a = 1\nend",
      "result": "[1:22] 'do' expected near 'local'",
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
      "source": "function f() while (1) local a = 1\nend",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "FunctionDeclaration",
            "identifier": {
              "type": "Identifier",
              "name": "f",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 9
                },
                "end": {
                  "line": 1,
                  "column": 10
                }
              },
              "range": [
                9,
                10
              ],
              "isLocal": false
            },
            "isLocal": false,
            "parameters": [],
            "body": [
              {
                "type": "WhileStatement",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 20
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "range": [
                    20,
                    21
                  ]
                },
                "body": [
                  {
                    "type": "LocalStatement",
                    "variables": [
                      {
                        "type": "Identifier",
                        "name": "a",
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 29
                          },
                          "end": {
                            "line": 1,
                            "column": 30
                          }
                        },
                        "range": [
                          29,
                          30
                        ],
                        "isLocal": true
                      }
                    ],
                    "init": [
                      {
                        "type": "NumericLiteral",
                        "value": 1,
                        "raw": "1",
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 33
                          },
                          "end": {
                            "line": 1,
                            "column": 34
                          }
                        },
                        "range": [
                          33,
                          34
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 23
                      },
                      "end": {
                        "line": 1,
                        "column": 34
                      }
                    },
                    "range": [
                      23,
                      34
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 13
                  },
                  "end": {
                    "line": 1,
                    "column": 34
                  }
                },
                "range": [
                  13,
                  34
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
                "column": 3
              }
            },
            "range": [
              0,
              38
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
            "column": 3
          }
        },
        "range": [
          0,
          38
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "f",
            "loc": {
              "start": {
                "line": 1,
                "column": 9
              },
              "end": {
                "line": 1,
                "column": 10
              }
            },
            "range": [
              9,
              10
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
      "source": "while (1) end",
      "result": "[1:10] 'do' expected near ')'",
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
      "source": "a = 0xFFwhile (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "NumericLiteral",
                "value": 255,
                "raw": "0xFF",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "range": [
                  4,
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
            ]
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 15
                },
                "end": {
                  "line": 1,
                  "column": 16
                }
              },
              "range": [
                15,
                16
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 18
                      },
                      "end": {
                        "line": 1,
                        "column": 23
                      }
                    },
                    "range": [
                      18,
                      23
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 24
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "range": [
                        24,
                        25
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "range": [
                    18,
                    26
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 18
                  },
                  "end": {
                    "line": 1,
                    "column": 26
                  }
                },
                "range": [
                  18,
                  26
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 8
              },
              "end": {
                "line": 1,
                "column": 26
              }
            },
            "range": [
              8,
              26
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
            "column": 26
          }
        },
        "range": [
          0,
          26
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 18
              },
              "end": {
                "line": 1,
                "column": 23
              }
            },
            "range": [
              18,
              23
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
      "source": "a = \"42\"while (a) print(a)",
      "result": "[1:18] 'do' expected near 'print'",
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
      "source": "a = \"42\" while (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "\"42\"",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "range": [
                  4,
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
            ]
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 16
                },
                "end": {
                  "line": 1,
                  "column": 17
                }
              },
              "range": [
                16,
                17
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 19
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "range": [
                      19,
                      24
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 25
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "range": [
                        25,
                        26
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "range": [
                    19,
                    27
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "range": [
                  19,
                  27
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 9
              },
              "end": {
                "line": 1,
                "column": 27
              }
            },
            "range": [
              9,
              27
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
            "column": 27
          }
        },
        "range": [
          0,
          27
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 19
              },
              "end": {
                "line": 1,
                "column": 24
              }
            },
            "range": [
              19,
              24
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
      "source": "a = 0xFF;while (a) print(a)",
      "result": "[1:19] 'do' expected near 'print'",
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
      "source": "a = 0xFF; while (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "NumericLiteral",
                "value": 255,
                "raw": "0xFF",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "range": [
                  4,
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
            ]
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 17
                },
                "end": {
                  "line": 1,
                  "column": 18
                }
              },
              "range": [
                17,
                18
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 20
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "range": [
                      20,
                      25
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 26
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "range": [
                        26,
                        27
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 20
                    },
                    "end": {
                      "line": 1,
                      "column": 28
                    }
                  },
                  "range": [
                    20,
                    28
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 20
                  },
                  "end": {
                    "line": 1,
                    "column": 28
                  }
                },
                "range": [
                  20,
                  28
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 10
              },
              "end": {
                "line": 1,
                "column": 28
              }
            },
            "range": [
              10,
              28
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
            "column": 28
          }
        },
        "range": [
          0,
          28
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 20
              },
              "end": {
                "line": 1,
                "column": 25
              }
            },
            "range": [
              20,
              25
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
      "source": "a = 0xFF.while (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "NumericLiteral",
                "value": 255,
                "raw": "0xFF.",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 9
                  }
                },
                "range": [
                  4,
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
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 16
                },
                "end": {
                  "line": 1,
                  "column": 17
                }
              },
              "range": [
                16,
                17
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 19
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "range": [
                      19,
                      24
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 25
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "range": [
                        25,
                        26
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "range": [
                    19,
                    27
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "range": [
                  19,
                  27
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 9
              },
              "end": {
                "line": 1,
                "column": 27
              }
            },
            "range": [
              9,
              27
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
            "column": 27
          }
        },
        "range": [
          0,
          27
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 19
              },
              "end": {
                "line": 1,
                "column": 24
              }
            },
            "range": [
              19,
              24
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
      "source": "a = 10--[[..]]while (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "NumericLiteral",
                "value": 10,
                "raw": "10",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 6
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
                "line": 1,
                "column": 6
              }
            },
            "range": [
              0,
              6
            ]
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 21
                },
                "end": {
                  "line": 1,
                  "column": 22
                }
              },
              "range": [
                21,
                22
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 24
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "range": [
                      24,
                      29
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 30
                        },
                        "end": {
                          "line": 1,
                          "column": 31
                        }
                      },
                      "range": [
                        30,
                        31
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 24
                    },
                    "end": {
                      "line": 1,
                      "column": 32
                    }
                  },
                  "range": [
                    24,
                    32
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 24
                  },
                  "end": {
                    "line": 1,
                    "column": 32
                  }
                },
                "range": [
                  24,
                  32
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 14
              },
              "end": {
                "line": 1,
                "column": 32
              }
            },
            "range": [
              14,
              32
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
            "column": 32
          }
        },
        "range": [
          0,
          32
        ],
        "comments": [
          {
            "type": "Comment",
            "value": "..",
            "raw": "--[[..]]",
            "loc": {
              "start": {
                "line": 1,
                "column": 6
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "range": [
              6,
              14
            ]
          }
        ],
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 24
              },
              "end": {
                "line": 1,
                "column": 29
              }
            },
            "range": [
              24,
              29
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
      "source": "a = \"\"--[[..]]while (a) print(a)",
      "result": "[1:24] 'do' expected near 'print'",
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
      "source": "a = \"\" --[[..]]while (a) print(a)",
      "result": "[1:25] 'do' expected near 'print'",
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
      "source": "a = \"\" --[[..]]--[[..]]while (a) print(a)",
      "result": "[1:33] 'do' expected near 'print'",
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
      "source": "a = \"\"--[[..]] while (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "\"\"",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 6
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
                "line": 1,
                "column": 6
              }
            },
            "range": [
              0,
              6
            ]
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 22
                },
                "end": {
                  "line": 1,
                  "column": 23
                }
              },
              "range": [
                22,
                23
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 25
                      },
                      "end": {
                        "line": 1,
                        "column": 30
                      }
                    },
                    "range": [
                      25,
                      30
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 31
                        },
                        "end": {
                          "line": 1,
                          "column": 32
                        }
                      },
                      "range": [
                        31,
                        32
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 25
                    },
                    "end": {
                      "line": 1,
                      "column": 33
                    }
                  },
                  "range": [
                    25,
                    33
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 25
                  },
                  "end": {
                    "line": 1,
                    "column": 33
                  }
                },
                "range": [
                  25,
                  33
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 15
              },
              "end": {
                "line": 1,
                "column": 33
              }
            },
            "range": [
              15,
              33
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
            "column": 33
          }
        },
        "range": [
          0,
          33
        ],
        "comments": [
          {
            "type": "Comment",
            "value": "..",
            "raw": "--[[..]]",
            "loc": {
              "start": {
                "line": 1,
                "column": 6
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "range": [
              6,
              14
            ]
          }
        ],
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 25
              },
              "end": {
                "line": 1,
                "column": 30
              }
            },
            "range": [
              25,
              30
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
      "source": "while (1)",
      "result": "[1:9] 'do' expected near ')'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.3",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "while (1);\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 0
              }
            },
            "range": [
              0,
              11
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
            "column": 0
          }
        },
        "range": [
          0,
          11
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.3",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "while (1);\nlocal a = 1",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [],
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
          },
          {
            "type": "LocalStatement",
            "variables": [
              {
                "type": "Identifier",
                "name": "a",
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 6
                  },
                  "end": {
                    "line": 2,
                    "column": 7
                  }
                },
                "range": [
                  17,
                  18
                ],
                "isLocal": true
              }
            ],
            "init": [
              {
                "type": "NumericLiteral",
                "value": 1,
                "raw": "1",
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 10
                  },
                  "end": {
                    "line": 2,
                    "column": 11
                  }
                },
                "range": [
                  21,
                  22
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
                "column": 11
              }
            },
            "range": [
              11,
              22
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
            "column": 11
          }
        },
        "range": [
          0,
          22
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8-0.2.3",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "a = \"42\"while (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "\"42\"",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "range": [
                  4,
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
            ]
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 15
                },
                "end": {
                  "line": 1,
                  "column": 16
                }
              },
              "range": [
                15,
                16
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 18
                      },
                      "end": {
                        "line": 1,
                        "column": 23
                      }
                    },
                    "range": [
                      18,
                      23
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 24
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "range": [
                        24,
                        25
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 26
                    }
                  },
                  "range": [
                    18,
                    26
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 18
                  },
                  "end": {
                    "line": 1,
                    "column": 26
                  }
                },
                "range": [
                  18,
                  26
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 8
              },
              "end": {
                "line": 1,
                "column": 26
              }
            },
            "range": [
              8,
              26
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
            "column": 26
          }
        },
        "range": [
          0,
          26
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 18
              },
              "end": {
                "line": 1,
                "column": 23
              }
            },
            "range": [
              18,
              23
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
        "luaVersion": "PICO-8-0.2.4",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "a = 0xFF;while (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "NumericLiteral",
                "value": 255,
                "raw": "0xFF",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "range": [
                  4,
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
            ]
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 16
                },
                "end": {
                  "line": 1,
                  "column": 17
                }
              },
              "range": [
                16,
                17
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 19
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "range": [
                      19,
                      24
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 25
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "range": [
                        25,
                        26
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 27
                    }
                  },
                  "range": [
                    19,
                    27
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 27
                  }
                },
                "range": [
                  19,
                  27
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 9
              },
              "end": {
                "line": 1,
                "column": 27
              }
            },
            "range": [
              9,
              27
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
            "column": 27
          }
        },
        "range": [
          0,
          27
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 19
              },
              "end": {
                "line": 1,
                "column": 24
              }
            },
            "range": [
              19,
              24
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
        "luaVersion": "PICO-8-0.2.4",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "a = \"\"--[[..]]while (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "\"\"",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 6
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
                "line": 1,
                "column": 6
              }
            },
            "range": [
              0,
              6
            ]
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 21
                },
                "end": {
                  "line": 1,
                  "column": 22
                }
              },
              "range": [
                21,
                22
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 24
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "range": [
                      24,
                      29
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 30
                        },
                        "end": {
                          "line": 1,
                          "column": 31
                        }
                      },
                      "range": [
                        30,
                        31
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 24
                    },
                    "end": {
                      "line": 1,
                      "column": 32
                    }
                  },
                  "range": [
                    24,
                    32
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 24
                  },
                  "end": {
                    "line": 1,
                    "column": 32
                  }
                },
                "range": [
                  24,
                  32
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 14
              },
              "end": {
                "line": 1,
                "column": 32
              }
            },
            "range": [
              14,
              32
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
            "column": 32
          }
        },
        "range": [
          0,
          32
        ],
        "comments": [
          {
            "type": "Comment",
            "value": "..",
            "raw": "--[[..]]",
            "loc": {
              "start": {
                "line": 1,
                "column": 6
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "range": [
              6,
              14
            ]
          }
        ],
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 24
              },
              "end": {
                "line": 1,
                "column": 29
              }
            },
            "range": [
              24,
              29
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
        "luaVersion": "PICO-8-0.2.4",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "a = \"\" --[[..]]while (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "\"\"",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 6
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
                "line": 1,
                "column": 6
              }
            },
            "range": [
              0,
              6
            ]
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 22
                },
                "end": {
                  "line": 1,
                  "column": 23
                }
              },
              "range": [
                22,
                23
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 25
                      },
                      "end": {
                        "line": 1,
                        "column": 30
                      }
                    },
                    "range": [
                      25,
                      30
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 31
                        },
                        "end": {
                          "line": 1,
                          "column": 32
                        }
                      },
                      "range": [
                        31,
                        32
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 25
                    },
                    "end": {
                      "line": 1,
                      "column": 33
                    }
                  },
                  "range": [
                    25,
                    33
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 25
                  },
                  "end": {
                    "line": 1,
                    "column": 33
                  }
                },
                "range": [
                  25,
                  33
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 15
              },
              "end": {
                "line": 1,
                "column": 33
              }
            },
            "range": [
              15,
              33
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
            "column": 33
          }
        },
        "range": [
          0,
          33
        ],
        "comments": [
          {
            "type": "Comment",
            "value": "..",
            "raw": "--[[..]]",
            "loc": {
              "start": {
                "line": 1,
                "column": 7
              },
              "end": {
                "line": 1,
                "column": 15
              }
            },
            "range": [
              7,
              15
            ]
          }
        ],
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 25
              },
              "end": {
                "line": 1,
                "column": 30
              }
            },
            "range": [
              25,
              30
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
        "luaVersion": "PICO-8-0.2.4",
        "ignoreStrictP8FileFormat": true
      }
    },
    {
      "source": "a = \"\" --[[..]]--[[..]]while (a) print(a)",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
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
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "\"\"",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 6
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
                "line": 1,
                "column": 6
              }
            },
            "range": [
              0,
              6
            ]
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 30
                },
                "end": {
                  "line": 1,
                  "column": 31
                }
              },
              "range": [
                30,
                31
              ],
              "isLocal": false
            },
            "body": [
              {
                "type": "CallStatement",
                "expression": {
                  "type": "CallExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "print",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 33
                      },
                      "end": {
                        "line": 1,
                        "column": 38
                      }
                    },
                    "range": [
                      33,
                      38
                    ],
                    "isLocal": false
                  },
                  "arguments": [
                    {
                      "type": "Identifier",
                      "name": "a",
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 39
                        },
                        "end": {
                          "line": 1,
                          "column": 40
                        }
                      },
                      "range": [
                        39,
                        40
                      ],
                      "isLocal": false
                    }
                  ],
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 33
                    },
                    "end": {
                      "line": 1,
                      "column": 41
                    }
                  },
                  "range": [
                    33,
                    41
                  ]
                },
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 33
                  },
                  "end": {
                    "line": 1,
                    "column": 41
                  }
                },
                "range": [
                  33,
                  41
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 1,
                "column": 23
              },
              "end": {
                "line": 1,
                "column": 41
              }
            },
            "range": [
              23,
              41
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
            "column": 41
          }
        },
        "range": [
          0,
          41
        ],
        "comments": [
          {
            "type": "Comment",
            "value": "..",
            "raw": "--[[..]]",
            "loc": {
              "start": {
                "line": 1,
                "column": 7
              },
              "end": {
                "line": 1,
                "column": 15
              }
            },
            "range": [
              7,
              15
            ]
          },
          {
            "type": "Comment",
            "value": "..",
            "raw": "--[[..]]",
            "loc": {
              "start": {
                "line": 1,
                "column": 15
              },
              "end": {
                "line": 1,
                "column": 23
              }
            },
            "range": [
              15,
              23
            ]
          }
        ],
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
          },
          {
            "type": "Identifier",
            "name": "print",
            "loc": {
              "start": {
                "line": 1,
                "column": 33
              },
              "end": {
                "line": 1,
                "column": 38
              }
            },
            "range": [
              33,
              38
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
        "luaVersion": "PICO-8-0.2.4",
        "ignoreStrictP8FileFormat": true
      }
    }
  ];
}));
