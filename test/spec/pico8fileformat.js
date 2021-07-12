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
}(this, 'pico8fileformat', function (exports) {
  'use strict';

  exports.name = 'pico8fileformat';
  exports.spec = [
    {
      "source": "pico-8 cartridge\n\ncontent",
      "result": "[1:4] '=' expected near '-'"
    },
    {
      "source": "pico-8 cartridge\n\ncontent",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 2,
            "column": 8
          },
          "end": {
            "line": 2,
            "column": 8
          }
        },
        "range": [
          25,
          25
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": " pico-8 cartridge\n\ncontent",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 2,
            "column": 8
          },
          "end": {
            "line": 2,
            "column": 8
          }
        },
        "range": [
          26,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "blablapico-8 cartridgeblabla\n\ncontent",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 2,
            "column": 8
          },
          "end": {
            "line": 2,
            "column": 8
          }
        },
        "range": [
          37,
          37
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\nblabla\ncontent",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 2,
            "column": 14
          },
          "end": {
            "line": 2,
            "column": 14
          }
        },
        "range": [
          31,
          31
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridg\n\ncontent",
      "result": "[1:0] 'pico-8 cartridge' expected near '<bof>'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico 8 cartridge\n\ncontent",
      "result": "[1:0] 'pico-8 cartridge' expected near '<bof>'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__gfx__\ninvalid lua",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 4,
            "column": 11
          },
          "end": {
            "line": 4,
            "column": 11
          }
        },
        "range": [
          37,
          37
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\ninvalid lua",
      "result": "[4:8] '=' expected near 'lua'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n\n\n__lua__\n\n\ninvalid lua",
      "result": "[8:8] '=' expected near 'lua'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n\n\nz__lua__z\n\n\ninvalid lua",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 2,
            "column": 26
          },
          "end": {
            "line": 2,
            "column": 26
          }
        },
        "range": [
          43,
          43
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__gfx__\n\n\nblabla",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 6,
            "column": 6
          },
          "end": {
            "line": 6,
            "column": 6
          }
        },
        "range": [
          34,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__xyz__\nblabla",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 2,
            "column": 15
          },
          "end": {
            "line": 2,
            "column": 15
          }
        },
        "range": [
          32,
          32
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__invalid lua\n",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "range": [
          37,
          37
        ],
        "comments": [],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\na = \n__gfx__\n__lua__",
      "result": "[6:7] <expression> expected near '<eof>'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\na = \n__gfx__\n__lua__\n0",
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
                    "line": 4,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 1
                  }
                },
                "range": [
                  26,
                  27
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "NumericLiteral",
                "value": 0,
                "raw": "0",
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 0
                  },
                  "end": {
                    "line": 7,
                    "column": 1
                  }
                },
                "range": [
                  47,
                  48
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 1
              }
            },
            "range": [
              26,
              48
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 1
          }
        },
        "range": [
          26,
          48
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 1
              }
            },
            "range": [
              26,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n__lua__\na = \n__lua__\n0",
      "result": "[5:0] unexpected number '0' near '<eof>'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n__lua__\na = [[\n__gfx__]]\n__lua__\n]]",
      "result": "[6:0] unexpected symbol ']' near ']'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\na = [[\n__gfx__]]\n__lua__\n]]",
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
                    "line": 4,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 1
                  }
                },
                "range": [
                  26,
                  27
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "[[\n__gfx__]]\n__lua__\n]]",
                "rawInterrupted": "[[\n]]",
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 4
                  },
                  "end": {
                    "line": 7,
                    "column": 2
                  }
                },
                "range": [
                  30,
                  53
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 2
              }
            },
            "range": [
              26,
              53
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 2
          }
        },
        "range": [
          26,
          53
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 1
              }
            },
            "range": [
              26,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\na = [[\nz__gfx__]]\n__lua__\n]]",
      "result": "[7:0] unexpected symbol ']' near ']'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\na = [[\nz__gfx__\n__lua__\n]]",
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
                    "line": 4,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 1
                  }
                },
                "range": [
                  26,
                  27
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "[[\nz__gfx__\n__lua__\n]]",
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 4
                  },
                  "end": {
                    "line": 7,
                    "column": 2
                  }
                },
                "range": [
                  30,
                  52
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 2
              }
            },
            "range": [
              26,
              52
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 2
          }
        },
        "range": [
          26,
          52
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 1
              }
            },
            "range": [
              26,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\na = [=[\nz__gfx__\n__lua__\n]=]",
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
                    "line": 4,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 1
                  }
                },
                "range": [
                  26,
                  27
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "[=[\nz__gfx__\n__lua__\n]=]",
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 4
                  },
                  "end": {
                    "line": 7,
                    "column": 3
                  }
                },
                "range": [
                  30,
                  54
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 3
              }
            },
            "range": [
              26,
              54
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 3
          }
        },
        "range": [
          26,
          54
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 1
              }
            },
            "range": [
              26,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\n--[[\n__gfx__]]\n__lua__\n]]",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 7,
            "column": 2
          },
          "end": {
            "line": 7,
            "column": 2
          }
        },
        "range": [
          51,
          51
        ],
        "comments": [
          {
            "type": "Comment",
            "value": "\n",
            "raw": "--[[\n__gfx__]]\n__lua__\n]]",
            "rawInterrupted": "--[[\n]]",
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 2
              }
            },
            "range": [
              26,
              51
            ]
          }
        ],
        "globals": []
      },
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\n--[[\nz__gfx__]]\n__lua__\n]]",
      "result": "[7:0] unexpected symbol ']' near ']'",
      "options": {
        "comments": true,
        "locations": true,
        "ranges": true,
        "scope": true,
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\na = [=[\n__gfx__]]\n__lua__\n]=]",
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
                    "line": 4,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 1
                  }
                },
                "range": [
                  26,
                  27
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "[=[\n__gfx__]]\n__lua__\n]=]",
                "rawInterrupted": "[=[\n]=]",
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 4
                  },
                  "end": {
                    "line": 7,
                    "column": 3
                  }
                },
                "range": [
                  30,
                  55
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 3
              }
            },
            "range": [
              26,
              55
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 3
          }
        },
        "range": [
          26,
          55
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 1
              }
            },
            "range": [
              26,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\na = [=[\n__gfx__]=]\n__lua__\n]=]",
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
                    "line": 4,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 1
                  }
                },
                "range": [
                  26,
                  27
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "[=[\n__gfx__]=]\n__lua__\n]=]",
                "rawInterrupted": "[=[\n]=]",
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 4
                  },
                  "end": {
                    "line": 7,
                    "column": 3
                  }
                },
                "range": [
                  30,
                  56
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 3
              }
            },
            "range": [
              26,
              56
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 3
          }
        },
        "range": [
          26,
          56
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 1
              }
            },
            "range": [
              26,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\na = [[\n__xyz__\n\n__lua__\n]]",
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
                    "line": 4,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 1
                  }
                },
                "range": [
                  26,
                  27
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "[[\n__xyz__\n\n__lua__\n]]",
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 4
                  },
                  "end": {
                    "line": 8,
                    "column": 2
                  }
                },
                "range": [
                  30,
                  52
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 8,
                "column": 2
              }
            },
            "range": [
              26,
              52
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 2
          }
        },
        "range": [
          26,
          52
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 1
              }
            },
            "range": [
              26,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\na = [[\nz__gfx__\n__lua__\n]]\n__gfx__000",
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
                    "line": 4,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 1
                  }
                },
                "range": [
                  26,
                  27
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "StringLiteral",
                "value": null,
                "raw": "[[\nz__gfx__\n__lua__\n]]",
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 4
                  },
                  "end": {
                    "line": 7,
                    "column": 2
                  }
                },
                "range": [
                  30,
                  52
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 2
              }
            },
            "range": [
              26,
              52
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 4,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 2
          }
        },
        "range": [
          26,
          52
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 4,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 1
              }
            },
            "range": [
              26,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\n\na = 0\n\n__gfx__\n\n000\n\n__gff__\n\n111\n\n__lua__\n\nb = 0\n\n__gfx__\n\n222",
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
                    "line": 5,
                    "column": 0
                  },
                  "end": {
                    "line": 5,
                    "column": 1
                  }
                },
                "range": [
                  27,
                  28
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "NumericLiteral",
                "value": 0,
                "raw": "0",
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 4
                  },
                  "end": {
                    "line": 5,
                    "column": 5
                  }
                },
                "range": [
                  31,
                  32
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 5,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 5
              }
            },
            "range": [
              27,
              32
            ]
          },
          {
            "type": "AssignmentStatement",
            "variables": [
              {
                "type": "Identifier",
                "name": "b",
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 0
                  },
                  "end": {
                    "line": 17,
                    "column": 1
                  }
                },
                "range": [
                  71,
                  72
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "NumericLiteral",
                "value": 0,
                "raw": "0",
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 4
                  },
                  "end": {
                    "line": 17,
                    "column": 5
                  }
                },
                "range": [
                  75,
                  76
                ]
              }
            ],
            "loc": {
              "start": {
                "line": 17,
                "column": 0
              },
              "end": {
                "line": 17,
                "column": 5
              }
            },
            "range": [
              71,
              76
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 5,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 5
          }
        },
        "range": [
          27,
          76
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "a",
            "loc": {
              "start": {
                "line": 5,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 1
              }
            },
            "range": [
              27,
              28
            ],
            "isLocal": false
          },
          {
            "type": "Identifier",
            "name": "b",
            "loc": {
              "start": {
                "line": 17,
                "column": 0
              },
              "end": {
                "line": 17,
                "column": 1
              }
            },
            "range": [
              71,
              72
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__gfx__\n\n__xyz__\nblabla",
      "result": {
        "type": "Chunk",
        "body": [],
        "loc": {
          "start": {
            "line": 6,
            "column": 6
          },
          "end": {
            "line": 6,
            "column": 6
          }
        },
        "range": [
          41,
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
        "luaVersion": "PICO-8"
      }
    },
    {
      "source": "pico-8 cartridge\n\n__lua__\n\n__x = 0\ndada()",
      "result": {
        "type": "Chunk",
        "body": [
          {
            "type": "AssignmentStatement",
            "variables": [
              {
                "type": "Identifier",
                "name": "__x",
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 0
                  },
                  "end": {
                    "line": 5,
                    "column": 3
                  }
                },
                "range": [
                  27,
                  30
                ],
                "isLocal": false
              }
            ],
            "init": [
              {
                "type": "NumericLiteral",
                "value": 0,
                "raw": "0",
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 6
                  },
                  "end": {
                    "line": 5,
                    "column": 7
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
                "line": 5,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 7
              }
            },
            "range": [
              27,
              34
            ]
          },
          {
            "type": "CallStatement",
            "expression": {
              "type": "CallExpression",
              "base": {
                "type": "Identifier",
                "name": "dada",
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 0
                  },
                  "end": {
                    "line": 6,
                    "column": 4
                  }
                },
                "range": [
                  35,
                  39
                ],
                "isLocal": false
              },
              "arguments": [],
              "loc": {
                "start": {
                  "line": 6,
                  "column": 0
                },
                "end": {
                  "line": 6,
                  "column": 6
                }
              },
              "range": [
                35,
                41
              ]
            },
            "loc": {
              "start": {
                "line": 6,
                "column": 0
              },
              "end": {
                "line": 6,
                "column": 6
              }
            },
            "range": [
              35,
              41
            ]
          }
        ],
        "loc": {
          "start": {
            "line": 5,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 6
          }
        },
        "range": [
          27,
          41
        ],
        "comments": [],
        "globals": [
          {
            "type": "Identifier",
            "name": "__x",
            "loc": {
              "start": {
                "line": 5,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 3
              }
            },
            "range": [
              27,
              30
            ],
            "isLocal": false
          },
          {
            "type": "Identifier",
            "name": "dada",
            "loc": {
              "start": {
                "line": 6,
                "column": 0
              },
              "end": {
                "line": 6,
                "column": 4
              }
            },
            "range": [
              35,
              39
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
        "luaVersion": "PICO-8"
      }
    }
  ];
}));
