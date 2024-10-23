/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/open_social.json`.
 */
export type OpenSocial = {
  "address": "ospPaFn5JvovJ8NYsPmpP19EZjkMBYaNGucFiiRMpAe",
  "metadata": {
    "name": "openSocial",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createActivity",
      "discriminator": [
        185,
        108,
        147,
        27,
        45,
        183,
        236,
        153
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "joinMint",
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  111,
                  105,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "community"
              }
            ]
          }
        },
        {
          "name": "community",
          "optional": true
        },
        {
          "name": "joinMintAta",
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "joinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "activity",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  99,
                  116,
                  105,
                  118,
                  105,
                  116,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "profile.handle",
                "account": "profile"
              },
              {
                "kind": "account",
                "path": "profile.content_count",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "createComment",
      "discriminator": [
        236,
        232,
        11,
        180,
        70,
        206,
        73,
        145
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "activity",
          "writable": true
        },
        {
          "name": "community",
          "optional": true
        },
        {
          "name": "joinMint",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  111,
                  105,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "community"
              }
            ]
          }
        },
        {
          "name": "joinMintAta",
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "joinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "comment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "activity"
              },
              {
                "kind": "account",
                "path": "activity.comment_counter",
                "account": "activity"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "createCommunity",
      "discriminator": [
        203,
        214,
        176,
        194,
        13,
        207,
        22,
        60
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "storage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "tribe",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  105,
                  98,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "handle"
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  105,
                  98,
                  101,
                  95,
                  110,
                  102,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "tribe"
              }
            ]
          }
        },
        {
          "name": "collection",
          "writable": true
        },
        {
          "name": "destination",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "metadata",
          "writable": true
        },
        {
          "name": "edition",
          "writable": true
        },
        {
          "name": "joinMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  111,
                  105,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "tribe"
              }
            ]
          }
        },
        {
          "name": "joinMetadata",
          "writable": true
        },
        {
          "name": "userJoinAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "joinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        }
      ],
      "args": [
        {
          "name": "handle",
          "type": "string"
        },
        {
          "name": "uriCommunity",
          "type": "string"
        },
        {
          "name": "uriJoinMint",
          "type": "string"
        },
        {
          "name": "tags",
          "type": {
            "vec": "string"
          }
        }
      ]
    },
    {
      "name": "createMegaphone",
      "discriminator": [
        99,
        143,
        74,
        6,
        251,
        232,
        142,
        52
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "userProfile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user_profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "userAta",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  106,
                  70,
                  87,
                  100,
                  100,
                  53,
                  65,
                  117,
                  102,
                  113,
                  83,
                  83,
                  113,
                  101,
                  77,
                  50,
                  113,
                  78,
                  49,
                  120,
                  122,
                  121,
                  98,
                  97,
                  112,
                  67,
                  56,
                  71,
                  52,
                  119
                ]
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "referencedActivity"
        },
        {
          "name": "megaphone",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  103,
                  97,
                  112,
                  104,
                  111,
                  110,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "referenced_activity.content_id",
                "account": "activity"
              }
            ]
          }
        },
        {
          "name": "treasury",
          "writable": true
        },
        {
          "name": "treasuryAta",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "treasury"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "const",
                "value": [
                  69,
                  80,
                  106,
                  70,
                  87,
                  100,
                  100,
                  53,
                  65,
                  117,
                  102,
                  113,
                  83,
                  83,
                  113,
                  101,
                  77,
                  50,
                  113,
                  78,
                  49,
                  120,
                  122,
                  121,
                  98,
                  97,
                  112,
                  67,
                  56,
                  71,
                  52,
                  119
                ]
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "tags",
          "type": {
            "vec": "string"
          }
        },
        {
          "name": "currency",
          "type": {
            "defined": {
              "name": "currency"
            }
          }
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "duration",
          "type": "u64"
        },
        {
          "name": "megaphoneCtx",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "createOpenReaction",
      "discriminator": [
        191,
        239,
        188,
        134,
        255,
        84,
        125,
        199
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "activity"
        }
      ],
      "args": [
        {
          "name": "reaction",
          "type": {
            "defined": {
              "name": "openReaction"
            }
          }
        }
      ]
    },
    {
      "name": "deleteComment",
      "discriminator": [
        40,
        183,
        112,
        58,
        215,
        240,
        57,
        82
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "activity",
          "writable": true
        },
        {
          "name": "comment",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  109,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "activity"
              },
              {
                "kind": "arg",
                "path": "commentNumber"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "commentNumber",
          "type": "u64"
        }
      ]
    },
    {
      "name": "followProfile",
      "discriminator": [
        169,
        169,
        176,
        191,
        113,
        141,
        160,
        134
      ],
      "accounts": [
        {
          "name": "follower",
          "writable": true,
          "signer": true
        },
        {
          "name": "followerProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "follower_profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "followedProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "followed_profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "followMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  111,
                  108,
                  108,
                  111,
                  119,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "followed_profile.address",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "destination",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "follower"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "followMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        }
      ],
      "args": []
    },
    {
      "name": "initializeProfile",
      "discriminator": [
        32,
        145,
        77,
        213,
        58,
        39,
        251,
        234
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "storage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "arg",
                "path": "handle"
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101,
                  95,
                  110,
                  102,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "profile"
              }
            ]
          }
        },
        {
          "name": "collection",
          "writable": true
        },
        {
          "name": "destination",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "metadata",
          "writable": true
        },
        {
          "name": "edition",
          "writable": true
        },
        {
          "name": "followMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  111,
                  108,
                  108,
                  111,
                  119,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "followMetadata",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        }
      ],
      "args": [
        {
          "name": "handle",
          "type": "string"
        },
        {
          "name": "uriProfile",
          "type": "string"
        },
        {
          "name": "uriFollowMint",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeStorage",
      "discriminator": [
        190,
        129,
        110,
        149,
        188,
        153,
        142,
        131
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "ospStorage",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  111,
                  114,
                  97,
                  103,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "joinTribe",
      "discriminator": [
        180,
        250,
        78,
        209,
        58,
        243,
        229,
        235
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "tribe",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  114,
                  105,
                  98,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "tribe.handle",
                "account": "community"
              }
            ]
          }
        },
        {
          "name": "joinMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  106,
                  111,
                  105,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "tribe"
              }
            ]
          }
        },
        {
          "name": "profileAta",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "joinMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        }
      ],
      "args": []
    },
    {
      "name": "setCommentConditions",
      "discriminator": [
        185,
        183,
        149,
        51,
        70,
        226,
        179,
        33
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "profile",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "activity",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "commentConditions",
          "type": {
            "option": {
              "defined": {
                "name": "commentConditions"
              }
            }
          }
        }
      ]
    },
    {
      "name": "setFollowConditions",
      "discriminator": [
        253,
        121,
        2,
        188,
        113,
        19,
        39,
        160
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "profile.handle",
                "account": "profile"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "followCondition",
          "type": {
            "option": {
              "defined": {
                "name": "followCondition"
              }
            }
          }
        }
      ]
    },
    {
      "name": "unfollowProfile",
      "discriminator": [
        26,
        84,
        200,
        133,
        149,
        74,
        151,
        245
      ],
      "accounts": [
        {
          "name": "follower",
          "writable": true,
          "signer": true
        },
        {
          "name": "followerProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "follower_profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "followedProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "followed_profile.handle",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "followMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  111,
                  108,
                  108,
                  111,
                  119,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "followed_profile.address",
                "account": "profile"
              }
            ]
          }
        },
        {
          "name": "followerTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "follower"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "followMint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "activity",
      "discriminator": [
        159,
        236,
        145,
        113,
        221,
        192,
        137,
        112
      ]
    },
    {
      "name": "comment",
      "discriminator": [
        150,
        135,
        96,
        244,
        55,
        199,
        50,
        65
      ]
    },
    {
      "name": "community",
      "discriminator": [
        192,
        73,
        211,
        158,
        178,
        81,
        19,
        112
      ]
    },
    {
      "name": "megaphone",
      "discriminator": [
        4,
        9,
        77,
        32,
        161,
        69,
        242,
        56
      ]
    },
    {
      "name": "ospStorage",
      "discriminator": [
        62,
        19,
        145,
        212,
        106,
        5,
        83,
        111
      ]
    },
    {
      "name": "profile",
      "discriminator": [
        184,
        101,
        165,
        188,
        95,
        63,
        127,
        188
      ]
    }
  ],
  "events": [
    {
      "name": "activityCreated",
      "discriminator": [
        77,
        164,
        46,
        249,
        121,
        231,
        67,
        29
      ]
    },
    {
      "name": "commentCreated",
      "discriminator": [
        27,
        186,
        105,
        74,
        47,
        93,
        2,
        106
      ]
    },
    {
      "name": "commentDeleted",
      "discriminator": [
        146,
        39,
        8,
        104,
        147,
        78,
        109,
        22
      ]
    },
    {
      "name": "communityCreated",
      "discriminator": [
        218,
        186,
        205,
        161,
        125,
        58,
        101,
        64
      ]
    },
    {
      "name": "followed",
      "discriminator": [
        236,
        182,
        255,
        24,
        25,
        185,
        209,
        23
      ]
    },
    {
      "name": "joined",
      "discriminator": [
        16,
        20,
        44,
        48,
        132,
        189,
        68,
        98
      ]
    },
    {
      "name": "megaphoneCreated",
      "discriminator": [
        117,
        99,
        232,
        104,
        130,
        248,
        244,
        118
      ]
    },
    {
      "name": "openReactionCreated",
      "discriminator": [
        116,
        124,
        124,
        94,
        217,
        127,
        149,
        208
      ]
    },
    {
      "name": "profileCreated",
      "discriminator": [
        134,
        233,
        199,
        153,
        77,
        206,
        128,
        94
      ]
    },
    {
      "name": "unfollowed",
      "discriminator": [
        181,
        126,
        70,
        2,
        95,
        63,
        168,
        239
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "notProfileOwner",
      "msg": "Not profile owner"
    },
    {
      "code": 6001,
      "name": "invalidHandleLength",
      "msg": "Handle too long"
    },
    {
      "code": 6002,
      "name": "invalidHandle",
      "msg": "Handle Invalid"
    },
    {
      "code": 6003,
      "name": "followConditionsNotMet",
      "msg": "Follow conditions not met"
    },
    {
      "code": 6004,
      "name": "commentConditionsNotMet",
      "msg": "Comment conditions not met"
    },
    {
      "code": 6005,
      "name": "cannotFollowSelf",
      "msg": "Cannot follow self"
    },
    {
      "code": 6006,
      "name": "discriminatorNotValid",
      "msg": "Discriminator not valid"
    },
    {
      "code": 6007,
      "name": "alreadyFollowing",
      "msg": "Already following"
    },
    {
      "code": 6008,
      "name": "alreadyJoinedCommunity",
      "msg": "Already joined community"
    },
    {
      "code": 6009,
      "name": "didNotJoinCommunity",
      "msg": "Did not join community"
    },
    {
      "code": 6010,
      "name": "invalidCommunityId",
      "msg": "Invalid community ID"
    },
    {
      "code": 6011,
      "name": "tooManyTags",
      "msg": "Too many tags"
    },
    {
      "code": 6012,
      "name": "invalidContentUri",
      "msg": "Inavlid Content URI"
    },
    {
      "code": 6013,
      "name": "megaphoneNotExpired",
      "msg": "Megaphone not expired"
    }
  ],
  "types": [
    {
      "name": "activity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "communityId",
            "type": "u64"
          },
          {
            "name": "contentId",
            "type": "u64"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "commentCounter",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "commentConditions",
            "type": {
              "option": {
                "defined": {
                  "name": "commentConditions"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "activityCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "contentId",
            "type": "u64"
          },
          {
            "name": "communityId",
            "type": "u64"
          },
          {
            "name": "contentUri",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "ctx",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "comment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "communityId",
            "type": "u64"
          },
          {
            "name": "contentUri",
            "type": "string"
          },
          {
            "name": "referenceProfileId",
            "type": "u64"
          },
          {
            "name": "referenceContentId",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "commentConditions",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "onlyFollowers"
          },
          {
            "name": "sameCommunity"
          }
        ]
      }
    },
    {
      "name": "commentCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "contentId",
            "type": "u64"
          },
          {
            "name": "communityId",
            "type": "u64"
          },
          {
            "name": "contentUri",
            "type": "string"
          },
          {
            "name": "referenceProfileId",
            "type": "u64"
          },
          {
            "name": "referenceContentId",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "ctx",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "commentDeleted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "contentId",
            "type": "u64"
          },
          {
            "name": "communityId",
            "type": "u64"
          },
          {
            "name": "contentUri",
            "type": "string"
          },
          {
            "name": "referenceProfileId",
            "type": "u64"
          },
          {
            "name": "referenceContentId",
            "type": "u64"
          },
          {
            "name": "commentId",
            "type": "u64"
          },
          {
            "name": "ctx",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "community",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "handle",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "communityCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "communityId",
            "type": "u64"
          },
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "handle",
            "type": "string"
          },
          {
            "name": "joinMint",
            "type": "pubkey"
          },
          {
            "name": "tags",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "ctx",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "currency",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "sol"
          },
          {
            "name": "usdc"
          }
        ]
      }
    },
    {
      "name": "followCondition",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "isFollowing",
            "fields": [
              {
                "name": "handle",
                "type": "string"
              }
            ]
          },
          {
            "name": "minimumFollowers",
            "fields": [
              "u32"
            ]
          }
        ]
      }
    },
    {
      "name": "followed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "follower",
            "type": "pubkey"
          },
          {
            "name": "followerProfileId",
            "type": "u64"
          },
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "ctx",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "joined",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "joiner",
            "type": "pubkey"
          },
          {
            "name": "joinerProfileId",
            "type": "u64"
          },
          {
            "name": "communityId",
            "type": "u64"
          },
          {
            "name": "tokenId",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "ctx",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "megaphone",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "referencedProfileId",
            "type": "u64"
          },
          {
            "name": "referencedContentId",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "duration",
            "type": "u64"
          },
          {
            "name": "currency",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "megaphoneCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "referenceProfileId",
            "type": "u64"
          },
          {
            "name": "referenceContentId",
            "type": "u64"
          },
          {
            "name": "tags",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "duration",
            "type": "u64"
          },
          {
            "name": "currency",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "ctx",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "openReaction",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "like"
          },
          {
            "name": "voteUp"
          },
          {
            "name": "voteDown"
          },
          {
            "name": "voteCancel"
          }
        ]
      }
    },
    {
      "name": "openReactionCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "communityId",
            "type": "u64"
          },
          {
            "name": "referenceProfileId",
            "type": "u64"
          },
          {
            "name": "referenceContentId",
            "type": "u64"
          },
          {
            "name": "reactionValue",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "ctx",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "ospStorage",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "communityId",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "handle",
            "type": "string"
          },
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "followers",
            "type": "u32"
          },
          {
            "name": "following",
            "type": "u32"
          },
          {
            "name": "contentCount",
            "type": "u32"
          },
          {
            "name": "followBump",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "followCondition",
            "type": {
              "option": {
                "defined": {
                  "name": "followCondition"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "profileCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "address",
            "type": "pubkey"
          },
          {
            "name": "handle",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "ctx",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "unfollowed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "follower",
            "type": "pubkey"
          },
          {
            "name": "followerProfileId",
            "type": "u64"
          },
          {
            "name": "profileId",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "ctx",
            "type": "bytes"
          }
        ]
      }
    }
  ]
};
