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
}(this, 'conditional', function (exports) {
  'use strict';

  exports.name = 'conditional';
  exports.spec = [
    {
      "source": "if",
      "result": "[1:2] <expression> expected near '<eof>'"
    },
    {
      "source": "elseif",
      "result": "[1:0] unexpected keyword 'elseif' near '<eof>'"
    },
    {
      "source": "else",
      "result": "[1:0] unexpected keyword 'else' near '<eof>'"
    },
    {
      "source": "then",
      "result": "[1:0] unexpected keyword 'then' near '<eof>'"
    },
    {
      "source": "if then",
      "result": "[1:3] <expression> expected near 'then'"
    },
    {
      "source": "if 1",
      "result": "[1:4] 'then' expected near '<eof>'"
    },
    {
      "source": "if 1 then",
      "result": "[1:9] 'end' expected near '<eof>'"
    },
    {
      "source": "if 1 else",
      "result": "[1:5] 'then' expected near 'else'"
    },
    {
      "source": "if 1 then else",
      "result": "[1:14] 'end' expected near '<eof>'"
    },
    {
      "source": "if 1 then elseif",
      "result": "[1:16] <expression> expected near '<eof>'"
    },
    {
      "source": "if 1 then end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                "column": 13
              }
            },
            "range": [
              0,
              13
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
            "column": 13
          }
        },
        "range": [
          0,
          13
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "if 1 then local a end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "range": [
                      10,
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
      "source": "if 1 then local a local b end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "range": [
                      10,
                      17
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
                        "isLocal": true
                      }
                    ],
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 18
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "range": [
                      18,
                      25
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
                    "column": 25
                  }
                },
                "range": [
                  0,
                  25
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
                "column": 29
              }
            },
            "range": [
              0,
              29
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
            "column": 29
          }
        },
        "range": [
          0,
          29
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "if 1 then local a; local b; end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "range": [
                      10,
                      17
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
                "column": 31
              }
            },
            "range": [
              0,
              31
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
            "column": 31
          }
        },
        "range": [
          0,
          31
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "if 1 then else end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "column": 9
                  }
                },
                "range": [
                  0,
                  9
                ]
              },
              {
                "type": "ElseClause",
                "body": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 10
                  },
                  "end": {
                    "line": 1,
                    "column": 14
                  }
                },
                "range": [
                  10,
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
                "column": 18
              }
            },
            "range": [
              0,
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
            "column": 18
          }
        },
        "range": [
          0,
          18
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "if 1 then local a else local b end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "range": [
                      10,
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
                ]
              },
              {
                "type": "ElseClause",
                "body": [
                  {
                    "type": "LocalStatement",
                    "variables": [
                      {
                        "type": "Identifier",
                        "name": "b",
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
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 23
                      },
                      "end": {
                        "line": 1,
                        "column": 30
                      }
                    },
                    "range": [
                      23,
                      30
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 18
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                },
                "range": [
                  18,
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
                "column": 34
              }
            },
            "range": [
              0,
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
            "line": 1,
            "column": 34
          }
        },
        "range": [
          0,
          34
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "if 1 then local a; else local b; end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "range": [
                      10,
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
                    "column": 18
                  }
                },
                "range": [
                  0,
                  18
                ]
              },
              {
                "type": "ElseClause",
                "body": [
                  {
                    "type": "LocalStatement",
                    "variables": [
                      {
                        "type": "Identifier",
                        "name": "b",
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
                        "isLocal": true
                      }
                    ],
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 24
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "range": [
                      24,
                      31
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 32
                  }
                },
                "range": [
                  19,
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
                "column": 36
              }
            },
            "range": [
              0,
              36
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
            "column": 36
          }
        },
        "range": [
          0,
          36
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "if 1 then elseif 2",
      "result": "[1:18] 'then' expected near '<eof>'"
    },
    {
      "source": "if 1 then elseif 2 then",
      "result": "[1:23] 'end' expected near '<eof>'"
    },
    {
      "source": "if 1 then elseif 2 then end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "column": 9
                  }
                },
                "range": [
                  0,
                  9
                ]
              },
              {
                "type": "ElseifClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 2,
                  "raw": "2",
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
                  ]
                },
                "body": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 10
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "range": [
                  10,
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
      "source": "if 1 then local a elseif 2 then local b end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "range": [
                      10,
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
                ]
              },
              {
                "type": "ElseifClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 2,
                  "raw": "2",
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
                  ]
                },
                "body": [
                  {
                    "type": "LocalStatement",
                    "variables": [
                      {
                        "type": "Identifier",
                        "name": "b",
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 38
                          },
                          "end": {
                            "line": 1,
                            "column": 39
                          }
                        },
                        "range": [
                          38,
                          39
                        ],
                        "isLocal": true
                      }
                    ],
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 32
                      },
                      "end": {
                        "line": 1,
                        "column": 39
                      }
                    },
                    "range": [
                      32,
                      39
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 18
                  },
                  "end": {
                    "line": 1,
                    "column": 39
                  }
                },
                "range": [
                  18,
                  39
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
                "column": 43
              }
            },
            "range": [
              0,
              43
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
            "column": 43
          }
        },
        "range": [
          0,
          43
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "if 1 then local a; elseif 2 then local b; end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "range": [
                      10,
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
                    "column": 18
                  }
                },
                "range": [
                  0,
                  18
                ]
              },
              {
                "type": "ElseifClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 2,
                  "raw": "2",
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
                  ]
                },
                "body": [
                  {
                    "type": "LocalStatement",
                    "variables": [
                      {
                        "type": "Identifier",
                        "name": "b",
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
                        "isLocal": true
                      }
                    ],
                    "init": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 33
                      },
                      "end": {
                        "line": 1,
                        "column": 40
                      }
                    },
                    "range": [
                      33,
                      40
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 41
                  }
                },
                "range": [
                  19,
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
                "column": 45
              }
            },
            "range": [
              0,
              45
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
            "column": 45
          }
        },
        "range": [
          0,
          45
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "if 1 then elseif 2 then else end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "column": 9
                  }
                },
                "range": [
                  0,
                  9
                ]
              },
              {
                "type": "ElseifClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 2,
                  "raw": "2",
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
                  ]
                },
                "body": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 10
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "range": [
                  10,
                  23
                ]
              },
              {
                "type": "ElseClause",
                "body": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 24
                  },
                  "end": {
                    "line": 1,
                    "column": 28
                  }
                },
                "range": [
                  24,
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
      "source": "if 1 then else if 2 then end end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                    "column": 9
                  }
                },
                "range": [
                  0,
                  9
                ]
              },
              {
                "type": "ElseClause",
                "body": [
                  {
                    "type": "IfStatement",
                    "clauses": [
                      {
                        "type": "IfClause",
                        "condition": {
                          "type": "NumericLiteral",
                          "value": 2,
                          "raw": "2",
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 19
                            }
                          },
                          "range": [
                            18,
                            19
                          ]
                        },
                        "body": [],
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 24
                          }
                        },
                        "range": [
                          15,
                          24
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
                        "column": 28
                      }
                    },
                    "range": [
                      15,
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
      "source": "if 1 then else if 2 then end",
      "result": "[1:28] 'end' expected near '<eof>'"
    },
    {
      "source": "if 1 then return end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                  ]
                },
                "body": [
                  {
                    "type": "ReturnStatement",
                    "arguments": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 16
                      }
                    },
                    "range": [
                      10,
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
      "source": "if 1 then return return end",
      "result": "[1:17] 'end' expected near 'return'"
    },
    {
      "source": "if 1 then end; if 1 then end;",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
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
                "column": 13
              }
            },
            "range": [
              0,
              13
            ]
          },
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 19
                    }
                  },
                  "range": [
                    18,
                    19
                  ]
                },
                "body": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 24
                  }
                },
                "range": [
                  15,
                  24
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
                "column": 28
              }
            },
            "range": [
              15,
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
            "column": 29
          }
        },
        "range": [
          0,
          29
        ],
        "comments": [],
        "globals": []
      }
    },
    {
      "source": "if then end",
      "result": "[1:3] <expression> expected near 'then'"
    },
    {
      "source": "if 1 then elseif then end",
      "result": "[1:17] <expression> expected near 'then'"
    },
    {
      "source": "if (1)",
      "result": "[1:6] '<body>' expected near '<eof>'",
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
      "source": "if (1) local a = 1\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "range": [
                          13,
                          14
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
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "range": [
                      7,
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
                    "column": 18
                  }
                },
                "range": [
                  0,
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
                "line": 2,
                "column": 0
              }
            },
            "range": [
              0,
              19
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
          19
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
      "source": "if (1) local a = 1",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "range": [
                          13,
                          14
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
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "range": [
                      7,
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
                    "column": 18
                  }
                },
                "range": [
                  0,
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
                "column": 18
              }
            },
            "range": [
              0,
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
            "column": 18
          }
        },
        "range": [
          0,
          18
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
      "source": "if (1) else\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                    "column": 6
                  }
                },
                "range": [
                  0,
                  6
                ]
              },
              {
                "type": "ElseClause",
                "body": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 11
                  }
                },
                "range": [
                  7,
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
              12
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
          12
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
      "source": "if (1) local a = 1 else\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "range": [
                          13,
                          14
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
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "range": [
                      7,
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
                    "column": 18
                  }
                },
                "range": [
                  0,
                  18
                ]
              },
              {
                "type": "ElseClause",
                "body": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "range": [
                  19,
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
                "line": 2,
                "column": 0
              }
            },
            "range": [
              0,
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
            "line": 2,
            "column": 0
          }
        },
        "range": [
          0,
          24
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
      "source": "if (1) else local b = 1\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                    "column": 6
                  }
                },
                "range": [
                  0,
                  6
                ]
              },
              {
                "type": "ElseClause",
                "body": [
                  {
                    "type": "LocalStatement",
                    "variables": [
                      {
                        "type": "Identifier",
                        "name": "b",
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 19
                          }
                        },
                        "range": [
                          18,
                          19
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
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 12
                      },
                      "end": {
                        "line": 1,
                        "column": 23
                      }
                    },
                    "range": [
                      12,
                      23
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "range": [
                  7,
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
                "line": 2,
                "column": 0
              }
            },
            "range": [
              0,
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
            "line": 2,
            "column": 0
          }
        },
        "range": [
          0,
          24
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
      "source": "if (1) local a = 1 else local b = 1\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "range": [
                          13,
                          14
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
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "range": [
                      7,
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
                    "column": 18
                  }
                },
                "range": [
                  0,
                  18
                ]
              },
              {
                "type": "ElseClause",
                "body": [
                  {
                    "type": "LocalStatement",
                    "variables": [
                      {
                        "type": "Identifier",
                        "name": "b",
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
                            "column": 34
                          },
                          "end": {
                            "line": 1,
                            "column": 35
                          }
                        },
                        "range": [
                          34,
                          35
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 24
                      },
                      "end": {
                        "line": 1,
                        "column": 35
                      }
                    },
                    "range": [
                      24,
                      35
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 35
                  }
                },
                "range": [
                  19,
                  35
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
              36
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
          36
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
      "source": "if (1) do",
      "result": "[1:9] 'end' expected near '<eof>'",
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
      "source": "if (1) end do\ndo end",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                    "column": 6
                  }
                },
                "range": [
                  0,
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
                "column": 10
              }
            },
            "range": [
              0,
              10
            ]
          },
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
                "column": 13
              }
            },
            "range": [
              11,
              13
            ]
          },
          {
            "type": "DoStatement",
            "body": [],
            "loc": {
              "start": {
                "line": 2,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 6
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
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 6
          }
        },
        "range": [
          0,
          20
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
      "source": "if (1) do end\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
                  ]
                },
                "body": [
                  {
                    "type": "DoStatement",
                    "body": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 13
                      }
                    },
                    "range": [
                      7,
                      13
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
                    "column": 13
                  }
                },
                "range": [
                  0,
                  13
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
            "line": 2,
            "column": 0
          }
        },
        "range": [
          0,
          14
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
      "source": "if (1) do\nend",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
                  ]
                },
                "body": [
                  {
                    "type": "DoStatement",
                    "body": [],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 9
                      }
                    },
                    "range": [
                      7,
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
                "line": 2,
                "column": 3
              }
            },
            "range": [
              0,
              13
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
          13
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
      "source": "if (1) else do",
      "result": "[1:14] 'end' expected near '<eof>'",
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
      "source": "if (1) else do local b = 1",
      "result": "[1:26] 'end' expected near '<eof>'",
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
      "source": "if (1) else do local b = 1\nend",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                    "column": 6
                  }
                },
                "range": [
                  0,
                  6
                ]
              },
              {
                "type": "ElseClause",
                "body": [
                  {
                    "type": "DoStatement",
                    "body": [
                      {
                        "type": "LocalStatement",
                        "variables": [
                          {
                            "type": "Identifier",
                            "name": "b",
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
                            "column": 26
                          }
                        },
                        "range": [
                          15,
                          26
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 12
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "range": [
                      12,
                      26
                    ]
                  }
                ],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 26
                  }
                },
                "range": [
                  7,
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
                "line": 2,
                "column": 3
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
            "line": 2,
            "column": 3
          }
        },
        "range": [
          0,
          30
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
      "source": "if (1) and 2 local a = 3",
      "result": "[1:7] unexpected keyword 'and' near '2'",
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
      "source": "if (1) and (2) local a = 3",
      "result": "[1:7] unexpected keyword 'and' near '('",
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
      "source": "if (1) local a = 1 elseif 2 then local a = 2",
      "result": "[1:28] unexpected symbol 'elseif' near '2'",
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
      "source": "if (1) local a = 1 end function b()\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "range": [
                          13,
                          14
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
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "range": [
                      7,
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
                    "column": 18
                  }
                },
                "range": [
                  0,
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
          },
          {
            "type": "FunctionDeclaration",
            "identifier": {
              "type": "Identifier",
              "name": "b",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 32
                },
                "end": {
                  "line": 1,
                  "column": 33
                }
              },
              "range": [
                32,
                33
              ],
              "isLocal": false
            },
            "isLocal": false,
            "parameters": [],
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 23
              },
              "end": {
                "line": 2,
                "column": 0
              }
            },
            "range": [
              23,
              36
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
          36
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "b",
            "loc": {
              "start": {
                "line": 1,
                "column": 32
              },
              "end": {
                "line": 1,
                "column": 33
              }
            },
            "range": [
              32,
              33
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
      "source": "if (1) local a = 1 end while 1 do\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "range": [
                          13,
                          14
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
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "range": [
                      7,
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
                    "column": 18
                  }
                },
                "range": [
                  0,
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
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 23
              },
              "end": {
                "line": 2,
                "column": 0
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
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "range": [
          0,
          34
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
      "source": "if (1) local a = 1 end while 1 do end do\n",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "NumericLiteral",
                  "value": 1,
                  "raw": "1",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 5
                    }
                  },
                  "range": [
                    4,
                    5
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
                            "column": 13
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "range": [
                          13,
                          14
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
                        ]
                      }
                    ],
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "range": [
                      7,
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
                    "column": 18
                  }
                },
                "range": [
                  0,
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
          },
          {
            "type": "WhileStatement",
            "condition": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1",
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
              ]
            },
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 23
              },
              "end": {
                "line": 1,
                "column": 37
              }
            },
            "range": [
              23,
              37
            ]
          },
          {
            "type": "DoStatement",
            "body": [],
            "loc": {
              "start": {
                "line": 1,
                "column": 38
              },
              "end": {
                "line": 2,
                "column": 0
              }
            },
            "range": [
              38,
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
            "line": 2,
            "column": 0
          }
        },
        "range": [
          0,
          41
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
      "source": "for a=1,2 do if (1) local a = 1\nend",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "ForNumericStatement",
            "variable": {
              "type": "Identifier",
              "name": "a",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 4
                },
                "end": {
                  "line": 1,
                  "column": 5
                }
              },
              "range": [
                4,
                5
              ],
              "isLocal": true
            },
            "start": {
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
            "end": {
              "type": "NumericLiteral",
              "value": 2,
              "raw": "2",
              "loc": {
                "start": {
                  "line": 1,
                  "column": 8
                },
                "end": {
                  "line": 1,
                  "column": 9
                }
              },
              "range": [
                8,
                9
              ]
            },
            "step": null,
            "body": [
              {
                "type": "IfStatement",
                "clauses": [
                  {
                    "type": "IfClause",
                    "condition": {
                      "type": "NumericLiteral",
                      "value": 1,
                      "raw": "1",
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
                        "init": [
                          {
                            "type": "NumericLiteral",
                            "value": 1,
                            "raw": "1",
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
                            ]
                          }
                        ],
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "range": [
                          20,
                          31
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
                        "column": 31
                      }
                    },
                    "range": [
                      13,
                      31
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
                    "column": 31
                  }
                },
                "range": [
                  13,
                  31
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
              35
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
          35
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
      "source": "function f()if (1) local a = 1 end",
      "result": "[1:19] 'then' expected near 'local'",
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
      "source": "function f()if (1) local a = 1\nend",
      "result": "[1:19] 'then' expected near 'local'",
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
      "source": "function f() if (1) local a = 1\nend",
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
                "type": "IfStatement",
                "clauses": [
                  {
                    "type": "IfClause",
                    "condition": {
                      "type": "NumericLiteral",
                      "value": 1,
                      "raw": "1",
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
                        "init": [
                          {
                            "type": "NumericLiteral",
                            "value": 1,
                            "raw": "1",
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
                            ]
                          }
                        ],
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 20
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "range": [
                          20,
                          31
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
                        "column": 31
                      }
                    },
                    "range": [
                      13,
                      31
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
                    "column": 31
                  }
                },
                "range": [
                  13,
                  31
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
              35
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
          35
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
      "source": "a = 0xFFif (a) print(a)",
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
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "Identifier",
                  "name": "a",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "range": [
                    12,
                    13
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
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 20
                          }
                        },
                        "range": [
                          15,
                          20
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
                        }
                      ],
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
                    },
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
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 8
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "range": [
                  8,
                  23
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
                "column": 23
              }
            },
            "range": [
              8,
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
            "column": 23
          }
        },
        "range": [
          0,
          23
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
                "column": 15
              },
              "end": {
                "line": 1,
                "column": 20
              }
            },
            "range": [
              15,
              20
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
      "source": "a = \"42\"if (a) print(a)",
      "result": "[1:15] 'then' expected near 'print'",
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
      "source": "a = \"42\" if (a) print(a)",
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
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "Identifier",
                  "name": "a",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "range": [
                    13,
                    14
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
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "range": [
                          16,
                          21
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
                        }
                      ],
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 24
                        }
                      },
                      "range": [
                        16,
                        24
                      ]
                    },
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "range": [
                      16,
                      24
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
                    "column": 24
                  }
                },
                "range": [
                  9,
                  24
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
                "column": 24
              }
            },
            "range": [
              9,
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
            "column": 24
          }
        },
        "range": [
          0,
          24
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
                "column": 16
              },
              "end": {
                "line": 1,
                "column": 21
              }
            },
            "range": [
              16,
              21
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
      "source": "a = 0xFF;if (a) print(a)",
      "result": "[1:16] 'then' expected near 'print'",
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
      "source": "a = 0xFF; if (a) print(a)",
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
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "Identifier",
                  "name": "a",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 15
                    }
                  },
                  "range": [
                    14,
                    15
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
                              "column": 23
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "range": [
                            23,
                            24
                          ],
                          "isLocal": false
                        }
                      ],
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "range": [
                        17,
                        25
                      ]
                    },
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 17
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "range": [
                      17,
                      25
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
                    "column": 25
                  }
                },
                "range": [
                  10,
                  25
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
                "column": 25
              }
            },
            "range": [
              10,
              25
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
            "column": 25
          }
        },
        "range": [
          0,
          25
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
      "source": "a = 0xFF.if (a) print(a)",
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
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "Identifier",
                  "name": "a",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 14
                    }
                  },
                  "range": [
                    13,
                    14
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
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "range": [
                          16,
                          21
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
                        }
                      ],
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 24
                        }
                      },
                      "range": [
                        16,
                        24
                      ]
                    },
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "range": [
                      16,
                      24
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
                    "column": 24
                  }
                },
                "range": [
                  9,
                  24
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
                "column": 24
              }
            },
            "range": [
              9,
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
            "column": 24
          }
        },
        "range": [
          0,
          24
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
                "column": 16
              },
              "end": {
                "line": 1,
                "column": 21
              }
            },
            "range": [
              16,
              21
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
      "source": "a = 10--[[..]]if (a) print(a)",
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
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "Identifier",
                  "name": "a",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 18
                    },
                    "end": {
                      "line": 1,
                      "column": 19
                    }
                  },
                  "range": [
                    18,
                    19
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
                            "column": 21
                          },
                          "end": {
                            "line": 1,
                            "column": 26
                          }
                        },
                        "range": [
                          21,
                          26
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
                              "column": 27
                            },
                            "end": {
                              "line": 1,
                              "column": 28
                            }
                          },
                          "range": [
                            27,
                            28
                          ],
                          "isLocal": false
                        }
                      ],
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 21
                        },
                        "end": {
                          "line": 1,
                          "column": 29
                        }
                      },
                      "range": [
                        21,
                        29
                      ]
                    },
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 21
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "range": [
                      21,
                      29
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
                    "column": 29
                  }
                },
                "range": [
                  14,
                  29
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
                "column": 29
              }
            },
            "range": [
              14,
              29
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
            "column": 29
          }
        },
        "range": [
          0,
          29
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
                "column": 21
              },
              "end": {
                "line": 1,
                "column": 26
              }
            },
            "range": [
              21,
              26
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
      "source": "a = \"\"--[[..]]if (a) print(a)",
      "result": "[1:21] 'then' expected near 'print'",
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
      "source": "a = \"\" --[[..]]if (a) print(a)",
      "result": "[1:22] 'then' expected near 'print'",
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
      "source": "a = \"\" --[[..]]--[[..]]if (a) print(a)",
      "result": "[1:30] 'then' expected near 'print'",
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
      "source": "a = \"\"--[[..]] if (a) print(a)",
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
            "type": "IfStatement",
            "clauses": [
              {
                "type": "IfClause",
                "condition": {
                  "type": "Identifier",
                  "name": "a",
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "range": [
                    19,
                    20
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
                            "column": 22
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "range": [
                          22,
                          27
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
                              "column": 28
                            },
                            "end": {
                              "line": 1,
                              "column": 29
                            }
                          },
                          "range": [
                            28,
                            29
                          ],
                          "isLocal": false
                        }
                      ],
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 22
                        },
                        "end": {
                          "line": 1,
                          "column": 30
                        }
                      },
                      "range": [
                        22,
                        30
                      ]
                    },
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 22
                      },
                      "end": {
                        "line": 1,
                        "column": 30
                      }
                    },
                    "range": [
                      22,
                      30
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
                    "column": 30
                  }
                },
                "range": [
                  15,
                  30
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
                "column": 30
              }
            },
            "range": [
              15,
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
                "column": 22
              },
              "end": {
                "line": 1,
                "column": 27
              }
            },
            "range": [
              22,
              27
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
