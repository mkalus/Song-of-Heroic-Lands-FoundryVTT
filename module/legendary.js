/* eslint-disable no-unused-vars */
import * as sohl from "./sohl-common.js";

/* ====================================================================== */
/*          Constants                                                     */
/* ====================================================================== */

const fields = foundry.data.fields;

const LGND = {
    CONST: {
        // Legendary init message with ASCII Artwork (Doom font)
        initVersionMessage: ` _                               _
| |                             | |
| |     ___  __ _  ___ _ __   __| | __ _ _ __ _   _
| |    / _ \\/ _\` |/ _ \\ '_ \\ / _\` |/ _\` | '__| | | |
| |___|  __/ (_| |  __/ | | | (_| | (_| | |  | |_| |
\\_____/\\___|\\__, |\\___|_| |_|\\__,_|\\__,_|_|   \\__, |
             __/ |                             __/ |
            |___/                             |___/
===========================================================`,

        /** @enum */
        TACADV: {
            Action: "Action",
            Impact: "Impact",
            Precision: "Precision",
            Setup: "Setup",
        },

        MODS: {
            FATE: { NAME: "Fate", ABBR: "Fate" },
            REACH: { NAME: "Reach", ABBR: "Rch" },
            PULL: { NAME: "Pull", ABBR: "Pull" },
            IMPACTTA: { NAME: "Impact Tactical Advantage", ABBR: "ImpTA" },
            HEFT: { NAME: "Heft Penalty", ABBR: "Heft" },
            HEAL: { NAME: "Healing Base", ABBR: "Heal" },
            MOBILITY: { NAME: "Mobility", ABBR: "Mob" },
            PBIMPACT: { NAME: "Point Blank Impact", ABBR: "PBImp" },
            PBATTACK: { NAME: "Point Blank Attack", ABBR: "PBAtk" },
            V2RANGE: { NAME: "Volley x2 Range", ABBR: "V2Rng" },
            V3RANGE: { NAME: "Volley x3 Range", ABBR: "V3Rng" },
            V4RANGE: { NAME: "Volley x4 Range", ABBR: "V4Rng" },
            WTENC: { NAME: "Weight Encumbrance", ABBR: "WtEnc" },
            AGLSTR: { NAME: "Agility/Strength Modifier", ABBR: "AglStrMod" },
            WINDEDNESS: { NAME: "Windedness Fatigue", ABBR: "FtgWind" },
            WEARINESS: { NAME: "Weariness Fatigue", ABBR: "FtgWear" },
            WEAKNESS: { NAME: "Weakness Fatigue", ABBR: "FtgWeak" },
            FATIGUE: { NAME: "Fatigue", ABBR: "Fatg" },
            WEIGHT: { NAME: "Weight", ABBR: "Wt" },
            ENC: { NAME: "Encumbrance", ABBR: "Enc" },
            PRONE: { NAME: "Prone", ABBR: "Prone" },
            SPELLDIFF: { NAME: "Spell Difficulty \u00D72", ABBR: "SpDiff" },
            STRIMPMOD: { NAME: "Strength Impact Modifier", ABBR: "StrImpMod" },
            ARMORREDUCTION: { NAME: "Armor Reduction", ABBR: "ArmRed" },
            DEFARMOR: { NAME: "Defender Armor", ABBR: "DefArmor" },
            DURABILITY: { NAME: "Durability", ABBR: "Dur" },
            QUALITY: { NAME: "Quality", ABBR: "Qual" },
        },

        /** @enum */
        IMPACTTA: {
            Blunt: 3,
            Edged: 5,
            Piercing: 4,
            Fire: 2,
        },

        /** @enum */
        RANGES: {
            PB: "PB",
            Direct: "Direct",
            V2: "V2",
            V3: "V3",
            V4: "V4",
        },

        /** @enum */
        STATUSEFFECTS: {
            Sleep: "sleep",
            Prone: "prone",
            Unconscious: "unconscious",
            Incapacitated: "incapacitated",
            Stunned: "stun",
            Dead: "dead",
        },

        VERSETTINGS: {
            encIncr: {
                key: "encIncr",
                data: {
                    name: "Encumbrance tracking increment",
                    hint: "Calculate encumbrance by specified steps",
                    scope: "world",
                    config: true,
                    type: new fields.NumberField({
                        required: true,
                        nullable: false,
                        initial: 5,
                        min: 1,
                    }),
                },
            },
            attrSecModIncr: {
                key: "attrSecModIncr",
                data: {
                    name: "Attribute secondary modifier increment",
                    hint: "Calculate attribute secondary modifier by specified steps",
                    scope: "world",
                    config: true,
                    type: new fields.NumberField({
                        required: true,
                        nullable: false,
                        initial: 5,
                        min: 1,
                    }),
                },
            },
            optionGearDamage: {
                key: "optionGearDamage",
                data: {
                    name: "Gear Damage",
                    hint: "Enable combat rule that allows gear (weapons and armor) to be damaged or destroyed on successful block",
                    scope: "world",
                    config: true,
                    type: new fields.BooleanField({ initial: false }),
                },
            },
        },

        injuryLocations: {
            Custom: {
                impactType: "custom",
                location: { probWeight: 50 },
                isStumble: false,
                isFumble: false,
                amputatePenalty: 0,
                shockValue: 5,
                bleedingSevThreshold: 0,
                affectsMobility: false,
            },
            Skull: {
                impactType: "skull",
                location: { probWeight: 50 },
                isStumble: false,
                isFumble: false,
                amputatePenalty: 0,
                shockValue: 5,
                bleedingSevThreshold: 5,
                affectsMobility: true,
            },
            Face: {
                impactType: "face",
                location: { probWeight: 30 },
                isStumble: false,
                isFumble: false,
                amputatePenalty: 0,
                shockValue: 4,
                bleedingSevThreshold: 4,
                affectsMobility: true,
            },
            Neck: {
                impactType: "neck",
                location: { probWeight: 20 },
                isStumble: false,
                isFumble: false,
                amputatePenalty: -10,
                shockValue: 5,
                bleedingSevThreshold: 3,
                affectsMobility: true,
            },
            Shoulder: {
                impactType: "shoulder",
                location: { probWeight: 15 },
                isStumble: false,
                isFumble: true,
                amputatePenalty: 0,
                shockValue: 3,
                bleedingSevThreshold: 4,
                affectsMobility: false,
            },
            "Upper Arm": {
                impactType: "upperarm",
                location: { probWeight: 15 },
                isStumble: false,
                isFumble: true,
                amputatePenalty: -20,
                shockValue: 1,
                bleedingSevThreshold: 5,
                affectsMobility: false,
            },
            Elbow: {
                impactType: "elbow",
                location: { probWeight: 5 },
                isStumble: false,
                isFumble: true,
                amputatePenalty: -20,
                shockValue: 2,
                bleedingSevThreshold: 5,
                affectsMobility: false,
            },
            Forearm: {
                impactType: "forearm",
                location: { probWeight: 10 },
                isStumble: false,
                isFumble: true,
                amputatePenalty: -20,
                shockValue: 1,
                bleedingSevThreshold: 5,
                affectsMobility: false,
            },
            Hand: {
                impactType: "hand",
                location: { probWeight: 5 },
                isStumble: false,
                isFumble: true,
                amputatePenalty: -30,
                shockValue: 2,
                bleedingSevThreshold: 0,
                affectsMobility: false,
            },
            Thorax: {
                impactType: "thorax",
                location: { probWeight: 13 },
                isStumble: false,
                isFumble: false,
                amputatePenalty: 0,
                shockValue: 4,
                bleedingSevThreshold: 4,
                affectsMobility: true,
            },
            Abdomen: {
                impactType: "abdomen",
                location: { probWeight: 13 },
                isStumble: false,
                isFumble: false,
                amputatePenalty: 0,
                shockValue: 4,
                bleedingSevThreshold: 3,
                affectsMobility: true,
            },
            Pelvis: {
                impactType: "pelvis",
                location: { probWeight: 7 },
                isStumble: false,
                isFumble: false,
                amputatePenalty: 0,
                shockValue: 4,
                bleedingSevThreshold: 4,
                affectsMobility: true,
            },
            Thigh: {
                impactType: "thigh",
                location: { probWeight: 20 },
                isStumble: true,
                isFumble: false,
                amputatePenalty: -10,
                shockValue: 3,
                bleedingSevThreshold: 4,
                affectsMobility: true,
            },
            Knee: {
                impactType: "knee",
                location: { probWeight: 5 },
                isStumble: true,
                isFumble: false,
                amputatePenalty: -20,
                shockValue: 2,
                bleedingSevThreshold: 5,
                affectsMobility: true,
            },
            Calf: {
                impactType: "calf",
                location: { probWeight: 15 },
                isStumble: true,
                isFumble: false,
                amputatePenalty: -20,
                shockValue: 1,
                bleedingSevThreshold: 5,
                affectsMobility: true,
            },
            Foot: {
                impactType: "foot",
                location: { probWeight: 10 },
                isStumble: true,
                isFumble: false,
                amputatePenalty: -20,
                shockValue: 2,
                bleedingSevThreshold: 0,
                affectsMobility: true,
            },
        },

        meleeCombatTable: {
            block: {
                "cf:cf": {
                    atkFumble: true,
                    defFumble: true,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "mf:cf": {
                    atkFumble: false,
                    defFumble: true,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "ms:cf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 2,
                    defDice: 0,
                },
                "cs:cf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 3,
                    defDice: 0,
                },

                "cf:mf": {
                    atkFumble: true,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "mf:mf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: true,
                    atkDice: 0,
                    defDice: 0,
                },
                "ms:mf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 1,
                    defDice: 0,
                },
                "cs:mf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 2,
                    defDice: 0,
                },

                "cf:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: true,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "mf:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: true,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "ms:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: true,
                    atkDice: 0,
                    defDice: 0,
                },
                "cs:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 1,
                    defDice: 0,
                },

                "cf:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: true,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "mf:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: true,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "ms:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: true,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "cs:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: true,
                    atkDice: 0,
                    defDice: 0,
                },
            },
            counterstrike: {
                "cf:cf": {
                    atkFumble: true,
                    defFumble: true,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "mf:cf": {
                    atkFumble: false,
                    defFumble: true,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "ms:cf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 3,
                    defDice: 0,
                },
                "cs:cf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 4,
                    defDice: 0,
                },

                "cf:mf": {
                    atkFumble: true,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "mf:mf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: true,
                    atkDice: 0,
                    defDice: 0,
                },
                "ms:mf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 2,
                    defDice: 0,
                },
                "cs:mf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 3,
                    defDice: 0,
                },

                "cf:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 2,
                },
                "mf:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 1,
                },
                "ms:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 1,
                    defDice: 1,
                },
                "cs:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 1,
                    defDice: 0,
                },

                "cf:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 3,
                },
                "mf:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 2,
                },
                "ms:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 1,
                },
                "cs:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 2,
                    defDice: 2,
                },
            },
            dodge: {
                "cf:cf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: true,
                    defStumble: true,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "mf:cf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: true,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "ms:cf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 2,
                    defDice: 0,
                },
                "cs:cf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 3,
                    defDice: 0,
                },

                "cf:mf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: true,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "mf:mf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: true,
                    atkDice: 0,
                    defDice: 0,
                },
                "ms:mf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 1,
                    defDice: 0,
                },
                "cs:mf": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 2,
                    defDice: 0,
                },

                "cf:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: true,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "mf:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: true,
                    atkDice: 0,
                    defDice: 0,
                },
                "ms:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: true,
                    atkDice: 0,
                    defDice: 0,
                },
                "cs:ms": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 1,
                    defDice: 0,
                },

                "cf:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: true,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "mf:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: true,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                "ms:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: true,
                    atkDice: 0,
                    defDice: 0,
                },
                "cs:cs": {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: true,
                    atkDice: 0,
                    defDice: 0,
                },
            },
            ignore: {
                cf: {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: true,
                    block: false,
                    miss: false,
                    atkDice: 0,
                    defDice: 0,
                },
                mf: {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 1,
                    defDice: 0,
                },
                ms: {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 3,
                    defDice: 0,
                },
                cs: {
                    atkFumble: false,
                    defFumble: false,
                    atkStumble: false,
                    defStumble: false,
                    dta: false,
                    block: false,
                    miss: false,
                    atkDice: 4,
                    defDice: 0,
                },
            },
        },

        missileCombatTable: {
            block: {
                "cf:cf": { wild: true, block: false, miss: false, atkDice: 0 },
                "mf:cf": { wild: false, block: false, miss: true, atkDice: 0 },
                "ms:cf": { wild: false, block: false, miss: false, atkDice: 2 },
                "cs:cf": { wild: false, block: false, miss: false, atkDice: 3 },

                "cf:mf": { wild: true, block: false, miss: false, atkDice: 0 },
                "mf:mf": { wild: false, block: false, miss: true, atkDice: 0 },
                "ms:mf": { wild: false, block: false, miss: false, atkDice: 1 },
                "cs:mf": { wild: false, block: false, miss: false, atkDice: 2 },

                "cf:ms": { wild: true, block: false, miss: false, atkDice: 0 },
                "mf:ms": { wild: false, block: false, miss: true, atkDice: 0 },
                "ms:ms": { wild: false, block: true, miss: false, atkDice: 0 },
                "cs:ms": { wild: false, block: false, miss: false, atkDice: 1 },

                "cf:cs": { wild: true, block: false, miss: false, atkDice: 0 },
                "mf:cs": { wild: false, block: false, miss: true, atkDice: 0 },
                "ms:cs": { wild: false, block: true, miss: false, atkDice: 0 },
                "cs:cs": { wild: false, block: true, miss: false, atkDice: 0 },
            },
            dodge: {
                "cf:cf": { wild: true, block: false, miss: false, atkDice: 0 },
                "mf:cf": { wild: false, block: false, miss: true, atkDice: 0 },
                "ms:cf": { wild: false, block: false, miss: false, atkDice: 2 },
                "cs:cf": { wild: false, block: false, miss: false, atkDice: 3 },

                "cf:mf": { wild: true, block: false, miss: false, atkDice: 0 },
                "mf:mf": { wild: false, block: false, miss: true, atkDice: 0 },
                "ms:mf": { wild: false, block: false, miss: false, atkDice: 1 },
                "cs:mf": { wild: false, block: false, miss: false, atkDice: 2 },

                "cf:ms": { wild: true, block: false, miss: false, atkDice: 0 },
                "mf:ms": { wild: false, block: false, miss: true, atkDice: 0 },
                "ms:ms": { wild: false, block: false, miss: true, atkDice: 0 },
                "cs:ms": { wild: false, block: false, miss: false, atkDice: 1 },

                "cf:cs": { wild: true, block: false, miss: false, atkDice: 0 },
                "mf:cs": { wild: false, block: false, miss: true, atkDice: 0 },
                "ms:cs": { wild: false, block: false, miss: true, atkDice: 0 },
                "cs:cs": { wild: false, block: false, miss: true, atkDice: 0 },
            },
            ignore: {
                cf: { wild: true, block: false, miss: false, atkDice: 0 },
                mf: { wild: false, block: false, miss: true, atkDice: 0 },
                ms: { wild: false, block: false, miss: false, atkDice: 2 },
                cs: { wild: false, block: false, miss: false, atkDice: 3 },
            },
        },

        treatment: {
            blunt: {
                M: {
                    treatment: "Compress",
                    mod: {
                        name: "Treatment Bonus",
                        abbrev: "TrtBns",
                        value: 30,
                    },
                    useDexMod: false,
                    cf: {
                        hr: 4,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: -1,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                S: {
                    treatment: "Set & Splint",
                    mod: {
                        name: "Treatment Bonus",
                        abbrev: "TrtBns",
                        value: 10,
                    },
                    useDexMod: false,
                    cf: {
                        hr: 3,
                        infect: false,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 4,
                        infect: false,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                G: {
                    treatment: "Clean, Dress & Surgery",
                    mod: null,
                    useDexMod: true,
                    cf: {
                        hr: 2,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 3,
                        infect: false,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 4,
                        infect: false,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
            },
            piercing: {
                M: {
                    treatment: "Clean & Dress",
                    mod: {
                        name: "Treatment Bonus",
                        abbrev: "TrtBns",
                        value: 10,
                    },
                    useDexMod: false,
                    cf: {
                        hr: 4,
                        infect: true,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: -1,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                S: {
                    treatment: "Clean & Dress",
                    mod: null,
                    useDexMod: false,
                    cf: {
                        hr: 3,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 4,
                        infect: true,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                G: {
                    treatment: "Clean, Dress & Surgery",
                    mod: {
                        name: "Treatment Penalty",
                        abbrev: "TrtBns",
                        value: -10,
                    },
                    useDexMod: true,
                    cf: {
                        hr: 2,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 3,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 4,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
            },
            edged: {
                M: {
                    treatment: "Clean & Dress",
                    mod: {
                        name: "Treatment Bonus",
                        abbrev: "TrtBns",
                        value: 20,
                    },
                    useDexMod: false,
                    cf: {
                        hr: 4,
                        infect: true,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: -1,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                S: {
                    treatment: "Clean & Dress",
                    mod: {
                        name: "Treatment Bonus",
                        abbrev: "TrtBns",
                        value: 10,
                    },
                    useDexMod: false,
                    cf: {
                        hr: 3,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 4,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 5,
                        infect: false,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                G: {
                    treatment: "Clean, Dress & Surgery",
                    mod: null,
                    useDexMod: true,
                    cf: {
                        hr: 2,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 3,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 4,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
            },
            projectile: {
                M: {
                    treatment: "Clean & Dress",
                    mod: {
                        name: "Treatment Bonus",
                        abbrev: "TrtBns",
                        value: 10,
                    },
                    useDexMod: false,
                    cf: {
                        hr: 4,
                        infect: true,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: { hr: 5, infect: false, impair: false, bleed: false },
                    newInj: -1,
                    ms: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: -1,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                S: {
                    treatment: "Extract Projectile",
                    mod: null,
                    useDexMod: true,
                    cf: { hr: 3, infect: true, impair: true, bleed: false },
                    newInj: -1,
                    mf: {
                        hr: 4,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 5,
                        infect: true,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                G: {
                    treatment: "Extract Projectile",
                    mod: {
                        name: "Treatment Penalty",
                        abbrev: "TrtBns",
                        value: -10,
                    },
                    useDexMod: true,
                    cf: {
                        hr: 2,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 3,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 4,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 5,
                        infect: true,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
            },
            fire: {
                M: {
                    treatment: "Compress",
                    mod: {
                        name: "Treatment Bonus",
                        abbrev: "TrtBns",
                        value: 20,
                    },
                    useDexMod: false,
                    cf: {
                        hr: 4,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: -1,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                S: {
                    treatment: "Clean & Dress",
                    mod: {
                        name: "Treatment Bonus",
                        abbrev: "TrtBns",
                        value: 10,
                    },
                    useDexMod: false,
                    cf: {
                        hr: 3,
                        infect: true,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 4,
                        infect: true,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                G: {
                    treatment: "Clean & Dress",
                    mod: null,
                    useDexMod: false,
                    cf: {
                        hr: 2,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 3,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 4,
                        infect: true,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
            },
            frost: {
                M: {
                    treatment: "Warm",
                    mod: {
                        name: "Treatment Bonus",
                        abbrev: "TrtBns",
                        value: 40,
                    },
                    useDexMod: false,
                    cf: { hr: 4, infect: false, impair: false, bleed: false },
                    mf: { hr: 5, infect: false, impair: false, bleed: false },
                    ms: { hr: -1, infect: false, impair: false, bleed: false },
                    cs: { hr: -1, infect: false, impair: false, bleed: false },
                },
                S: {
                    treatment: "Warm",
                    mod: {
                        name: "Treatment Bonus",
                        abbrev: "TrtBns",
                        value: 20,
                    },
                    useDexMod: false,
                    cf: {
                        hr: 3,
                        infect: false,
                        impair: true,
                        bleed: false,
                        newInj: -1,
                    },
                    mf: {
                        hr: 4,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    ms: {
                        hr: 5,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                    cs: {
                        hr: 6,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: -1,
                    },
                },
                G: {
                    treatment: "Surgery & Amputate",
                    mod: null,
                    useDexMod: true,
                    cf: {
                        hr: -1,
                        infect: true,
                        impair: false,
                        bleed: true,
                        newInj: 5,
                    },
                    mf: {
                        hr: -1,
                        infect: false,
                        impair: false,
                        bleed: true,
                        newInj: 4,
                    },
                    ms: {
                        hr: -1,
                        infect: false,
                        impair: false,
                        bleed: true,
                        newInj: 3,
                    },
                    cs: {
                        hr: -1,
                        infect: false,
                        impair: false,
                        bleed: false,
                        newInj: 2,
                    },
                },
            },
        },
    },
};

class LgndImpactModifier extends sohl.ImpactModifier {
    // List of possible dice for impact dice.
    static get dice() {
        return {
            0: "None",
            4: "d4",
            6: "d6",
            8: "d8",
            10: "d10",
            12: "d12",
        };
    }

    static get maxImpactDie() {
        return Object.values(this.dice).at(-1);
    }

    get impactTA() {
        switch (this.aspect) {
            case "blunt":
                return 3;
            case "edged":
                return 5;
            case "piercing":
                return 4;
            case "fire":
                return 2;
            default:
                return 0;
        }
    }
}

class LgndMasteryLevelModifier extends sohl.MasteryLevelModifier {
    constructor(parent, initProperties = {}) {
        super(
            parent,
            foundry.utils.mergeObject(
                initProperties,
                {
                    secMod: (thisVM) => {
                        const secModIncr = game.settings.get(
                            "sohl",
                            "attrSecModIncr",
                        );
                        return Math.min(
                            25,
                            Math.max(
                                -25,
                                Math.trunc(
                                    ((thisVM.base ?? 0) / 2 - 25) / secModIncr,
                                ) * secModIncr,
                            ),
                        );
                    },
                },
                { inplace: false, recursive: false },
            ),
        );
    }
}

class LgndAnimateEntityActorData extends sohl.AnimateEntityActorData {
    $combatReach;
    $hasAuralShock;
    $maxZones;
    $healingBase;
    $encumbrance;
    $sunsign;
    $magicMod;

    get intrinsicActions() {
        let actions = super.intrinsicActions.map((a) => {
            if (a.contextGroup === sohl.SohlContextMenu.sortGroups.Default) {
                a.contextGroup = sohl.SohlContextMenu.sortGroups.Primary;
            }
            return a;
        });

        actions.push(
            // TODO - Add Lgnd Actor Actions
        );

        actions.sort((a, b) => a.contextGroup.localeCompare(b.contextGroup));
        return actions;
    }

    async damageRoll({
        targetToken,
        impactMod,
        numImpactTAs = 0,
        bodyLocationUuid,
        skipDialog = false,
        ...options
    } = {}) {
        return super.damageRoll({
            targetToken,
            impactMod,
            numImpactTAs,
            bodyLocationUuid,
            skipDialog,
            ...options,
        });
    }

    async _damageDialog({
        type,
        label,
        strikeMode,
        impactMod,
        numImpactTAs = 0,
        ...options
    }) {
        return super._damageDialog({
            type,
            label,
            strikeMode,
            impactMod,
            numImpactTAs,
            ...options,
        });
    }

    async _damageDialogCallback(html, { type, impactMod, strikeMode }) {
        const form = html[0].querySelector("form");
        const formNumImpactTAs =
            Number.parseInt(form.numImpactTAs.value, 10) || 0;
        const newImpact = impactMod
            ? this.constructor.create(impactMod)
            : {
                  die: Number.parseInt(form.impactDie.value, 10) || 0,
                  modifier: Number.parseInt(form.impactModifier.value, 10) || 0,
                  aspect: form.impactAspect.value,
              };
        if (formNumImpactTAs) {
            const impactAdd =
                (strikeMode?.system.$traits.impactTA || newImpact.impactTA) *
                formNumImpactTAs;
            newImpact.add(`${formNumImpactTAs} Impact TAs`, "ImpTA", impactAdd);
        }

        return super._damageDialogCallback(html, {
            type,
            impactMod,
            strikeMode,
        });
    }

    prepareBaseData() {
        super.prepareBaseData();
        this.$maxZones = 0;
        this.$combatReach = -99;
        this.$hasAuralShock = false;
        this.$healingBase = new sohl.ValueModifier(this);
        this.$encumbrance = new sohl.ValueModifier(this, {
            total: (thisVM) => {
                const encDiv = game.settings.get(
                    "sohl",
                    LGND.CONST.VERSETTINGS.encIncr.key,
                );
                let result = Math.round(
                    Math.floor((thisVM.effective + Number.EPSILON) * encDiv) /
                        encDiv,
                );
                return result;
            },
        });
        this.$encumbrance.floor("Min Zero", "Min0", 0);
        this.$magicMod = {};
    }
}

function LgndStrikeModeItemDataMixin(BaseMLID) {
    return class LgndStrikeModeItemData extends BaseMLID {
        $reach;
        $heft;

        get heftBase() {
            return this.item.getFlag("sohl", "legendary.heftBase") || 0;
        }

        get zoneDie() {
            return this.item.getFlag("sohl", "legendary.zoneDie") || 0;
        }

        static get effectKeys() {
            return sohl.Utility.simpleMerge(super.effectKeys, {
                "mod:system.$impact.armorReduction": {
                    label: "Armor Reduction",
                    abbrev: "AR",
                },
                "system.$defense.block.successLevelMod": {
                    label: "Block Success Level",
                    abbrev: "BlkSL",
                },
                "system.$defense.counterstrike.successLevelMod": {
                    label: "Counterstrike Success Level",
                    abbrev: "CXSL",
                },
                "system.$traits.opponentDef": {
                    label: "Opponent Defense",
                    abbrev: "OppDef",
                },
                "system.$traits.entangle": {
                    label: "Entangle",
                    abbrev: "Entangle",
                },
                "system.$traits.envelop": {
                    label: "Envelop",
                    abbrev: "Envlp",
                },
                "system.$traits.lowAim": {
                    label: "High Strike",
                    abbrev: "HiStrike",
                },
                "system.$traits.impactTA": {
                    label: "Impact Tac Adv",
                    abbrev: "ImpTA",
                },
                "system.$traits.notInClose": {
                    label: "Not In Close",
                    abbrev: "NotInCls",
                },
                "system.$traits.onlyInClose": {
                    label: "Only In Close",
                    abbrev: "OnlyInCls",
                },
                "system.$traits.lowStrike": {
                    label: "Low Strike",
                    abbrev: "LoStrike",
                },
                "system.$traits.deflectTN": {
                    label: "Deflect TN",
                    abbrev: "DeflTN",
                },
                "system.$traits.shieldMod": {
                    label: "Shield Mod",
                    abbrev: "ShldMod",
                },
                "system.$traits.extraBleedRisk": {
                    label: "Extra Bleed Risk",
                    abbrev: "XBldRsk",
                },
                "system.$traits.noStrMod": {
                    label: "No STR Mod",
                    abbrev: "NoStrMod",
                },
                "system.$traits.halfImpact": {
                    label: "Half Impact",
                    abbrev: "HlfImp",
                },
            });
        }

        prepareBaseData() {
            super.prepareBaseData();
            this.$reach = new sohl.ValueModifier(this);
            this.$heft = new sohl.ValueModifier(this);
            foundry.utils.mergeObject(this.$traits, {
                armorReduction: 0,
                blockSLMod: 0,
                cxSLMod: 0,
                opponentDef: 0,
                entangle: false,
                envelop: false,
                lowAim: false,
                impactTA: 0,
                notInClose: false,
                onlyInClose: false,
                deflectTN: 0,
                shieldMod: 0,
                extraBleedRisk: false,
                noStrMod: false,
                halfImpact: false,
                noBlock: false,
                noAttack: false,
            });
        }

        processSiblings() {
            super.processSiblings();
            if (this.$traits.noBlock) this.$defense.block.disabled = true;
            if (this.$traits.noAttack) {
                this.$attack.disabled = true;
                this.$defense.counterstrike.disabled = true;
            }
            if (this.$traits.blockSLMod)
                this.$defense.block.successLevelMod.add(
                    "SL Modifier",
                    "SLMod",
                    this.$traits.blockSLMod,
                );

            if (this.$traits.cxSLMod)
                this.$defense.counterstrike.successLevelMod.add(
                    "SL Modifier",
                    "SLMod",
                    this.$traits.cxSLMod,
                );

            const weapon = this.item.nestedIn;
            const strength = this.actor.getTraitByAbbrev("str");

            if (weapon?.system instanceof sohl.WeaponGearItemData) {
                this.$heft.addVM(weapon.system.$heft, {
                    includeBase: true,
                });
                this.$length.addVM(weapon.system.$length, {
                    includeBase: true,
                });

                // If held in a non-favored part, attack/block/CX are at -5
                if (!weapon.system.$heldByFavoredPart) {
                    this.$heft.add("Held by non-favored limb", "NonFavLimb", 5);
                }

                // If held in two hands (for a weapon that only requires one hand)
                // reduce the HFT by 5
                if (weapon.system.$heldBy.length > this.minParts) {
                    this.$heft.add("Multi-Limb Bonus", "MultLimb", -5);

                    if (strength) {
                        // If swung and STR is greater than base unmodified heft, impact
                        // increases by 1
                        if (
                            this.$traits.swung &&
                            strength.system.$score?.base >= this.heftBase
                        ) {
                            this.$impact.add(
                                "Swung Strength Bonus",
                                "SwgStr",
                                1,
                            );
                        }
                    }
                }
            } else {
                this.$length.setBase(this.lengthBase);
                this.$heft.setBase(this.heftBase);
            }

            if (strength) {
                const strValue = strength.system.$score?.effective || 0;

                const heftPenalty =
                    Math.max(0, this.$heft.effective - strValue) * -5;

                if (heftPenalty) {
                    this.$attack.add(
                        "Heft Strength Penalty",
                        "HeftStr",
                        heftPenalty,
                    );
                    this.$defense.block.add(
                        "Heft Strength Penalty",
                        "HeftStr",
                        heftPenalty,
                    );
                    this.$defense.counterstrike.add(
                        "Heft Strength Penalty",
                        "HeftStr",
                        heftPenalty,
                    );
                }
            }

            this.$reach.floor("Min Reach", "Min", 0);
            this.$reach.addVM(this.$length, {
                includeBase: true,
            });

            const size = this.actor.getTraitByAbbrev("siz");
            if (size) {
                const sizeReachMod = size.system.$params?.reachMod || 0;
                this.$reach.add("Size Modifier", "Siz", sizeReachMod);
            }
        }
    };
}

class LgndMeleeWeaponStrikeModeItemData extends LgndStrikeModeItemDataMixin(
    sohl.MeleeWeaponStrikeModeItemData,
) {
    static get effectKeys() {
        return sohl.Utility.simpleMerge(super.effectKeys, {
            "mod:system.$heft": { label: "Heft", abbrev: "Hft" },
            "system.$traits.couched": { label: "Couched", abbrev: "Couched" },
            "system.$traits.slow": { label: "Slow", abbrev: "Slow" },
            "system.$traits.thrust": { label: "Thrust", abbrev: "Thst" },
            "system.$traits.swung": { label: "Swung", abbrev: "Swng" },
            "system.$traits.halfSword": {
                label: "Half Sword",
                abbrev: "HlfSwd",
            },
            "system.$traits.twoPartLen": {
                label: "2H Length",
                abbrev: "2HLen",
            },
        });
    }

    get intrinsicActions() {
        let actions = super.intrinsicActions
            .filter((a) => a.name !== "attack")
            .map((a) => {
                if (
                    a.contextGroup === sohl.SohlContextMenu.sortGroups.Default
                ) {
                    a.contextGroup = sohl.SohlContextMenu.sortGroups.Primary;
                }
                return a;
            });

        actions.push({
            functionName: "automatedAttack",
            name: "Automated Attack",
            contextIconClass: "fas fa-sword",
            contextCondition: (header) => {
                header = header instanceof HTMLElement ? header : header[0];
                const li = header.closest(".item");
                const item = fromUuidSync(li.dataset.uuid);
                return item && !item.system.$attack.disabled;
            },
            contextGroup: sohl.SohlContextMenu.sortGroups.Default,
        });

        actions.sort((a, b) => a.contextGroup.localeCompare(b.contextGroup));
        return actions;
    }

    async automatedAttack(
        speaker = null,
        actor = null,
        token = null,
        character = null,
        {
            skipDialog = false,
            noChat = false,
            type = `${this.type}-${this.name}-bleed-stop-test`,
            title = `${this.item.label} Bleeding Stoppage Test`,
            // biome-ignore lint/correctness/noUnusedVariables: <explanation>
            ...scope
        },
    ) {
        ({ speaker, actor, token, character } =
            sohl.SohlMacro.getExecuteDefaults({
                speaker,
                actor,
                token,
                character,
            }));

        // TODO - Melee Automated Attack
        ui.notifications.warn("Melee Automated Attack Not Implemented");
    }

    /** @override */
    prepareBaseData() {
        super.prepareBaseData();
        foundry.utils.mergeObject(this.$traits, {
            couched: false,
            noAttack: false,
            noBlock: false,
            slow: false,
            thrust: false,
            swung: false,
            halfSword: false,
            twoPartLen: 0,
        });
    }

    processSiblings() {
        super.processSiblings();

        const strength = this.actor.getTraitByAbbrev("str");
        if (strength) {
            const strValue = strength.system.$score?.effective || 0;
            const strImpactMod = LgndUtility.strImpactMod(strValue);
            if (strImpactMod && !this.$traits.noStrMod) {
                this.$impact.add(
                    "Strength Impact Modifier",
                    "StrImpMod",
                    strImpactMod,
                );
            }
        }

        if (this.actor.system.$engagedOpponents.effective > 1) {
            const outnumberedPenalty =
                this.actor.system.$engagedOpponents.effective * -10;
            this.$defense.block.add("Outnumbered", "Outn", outnumberedPenalty);
            this.$defense.counterstrike.add(
                "Outnumbered",
                "Outn",
                outnumberedPenalty,
            );
        }
    }
}

class LgndMissileWeaponStrikeModeItemData extends LgndStrikeModeItemDataMixin(
    sohl.MissileWeaponStrikeModeItemData,
) {
    $baseRange;
    $draw;
    $canDraw;
    $pull;

    get maxVolleyMult() {
        return this.item.getFlag("sohl", "legendary.maxVolleyMult") || 0;
    }

    get baseRangeBase() {
        return this.item.getFlag("sohl", "legendary.baseRangeBase") || 0;
    }

    get drawBase() {
        return this.item.getFlag("sohl", "legendary.drawBase") || 0;
    }

    get zoneDie() {
        return (
            this.item.nestedIn?.getFlag("sohl", "legendary.zoneDie") ||
            this.item.getFlag("sohl", "legendary.zoneDie") ||
            0
        );
    }

    get intrinsicActions() {
        let actions = super.intrinsicActions
            .filter((a) => a.name !== "attack")
            .map((a) => {
                if (
                    a.contextGroup === sohl.SohlContextMenu.sortGroups.Default
                ) {
                    a.contextGroup = sohl.SohlContextMenu.sortGroups.Primary;
                }
                return a;
            });

        actions.push(
            {
                functionName: "automatedAttack",
                name: "Automated Attack",
                contextIconClass: "fas fa-bow-arrow",
                contextCondition: (header) => {
                    header = header instanceof HTMLElement ? header : header[0];
                    const li = header.closest(".item");
                    const item = fromUuidSync(li.dataset.uuid);
                    return item && !item.system.$attack.disabled;
                },
                contextGroup: sohl.SohlContextMenu.sortGroups.Default,
            },
            {
                functionName: "directAttackTest",
                name: "Direct Attack Test",
                contextIconClass: "fas fa-location-arrow-up fa-rotate-90",
                contextCondition: (header) => {
                    header = header instanceof HTMLElement ? header : header[0];
                    const li = header.closest(".item");
                    const item = fromUuidSync(li.dataset.uuid);
                    return item && !item.system.$attack.disabled;
                },
                contextGroup: sohl.SohlContextMenu.sortGroups.Primary,
            },
            {
                functionName: "volleyAttackTest",
                name: "Volley Attack Test",
                contextIconClass: "fas fa-location-arrow",
                contextCondition: (header) => {
                    header = header instanceof HTMLElement ? header : header[0];
                    const li = header.closest(".item");
                    const item = fromUuidSync(li.dataset.uuid);
                    return item && !item.system.$attack.disabled;
                },
                contextGroup: sohl.SohlContextMenu.sortGroups.Primary,
            },
        );

        actions.sort((a, b) => a.contextGroup.localeCompare(b.contextGroup));
        return actions;
    }

    async automatedAttack(
        speaker = null,
        actor = null,
        token = null,
        character = null,
        {
            skipDialog = false,
            noChat = false,
            type = `${this.type}-${this.name}-bleed-stop-test`,
            title = `${this.item.label} Bleeding Stoppage Test`,
            // biome-ignore lint/correctness/noUnusedVariables: <explanation>
            ...scope
        },
    ) {
        ({ speaker, actor, token, character } =
            sohl.SohlMacro.getExecuteDefaults({
                speaker,
                actor,
                token,
                character,
            }));

        // TODO - Missile Automated Attack
        ui.notifications.warn("Missile Automated Attack Not Implemented");
    }

    volleyAttack(
        speaker = null,
        actor = null,
        token = null,
        character = null,
        {
            skipDialog = false,
            noChat = false,
            type = `${this.type}-${this.name}-volley-attack`,
            title = `${this.item.label} Volley Attack`,
            // biome-ignore lint/correctness/noUnusedVariables: <explanation>
            ...scope
        },
    ) {
        ({ speaker, actor, token, character } =
            sohl.SohlMacro.getExecuteDefaults({
                speaker,
                actor,
                token,
                character,
            }));

        // TODO - Missile Volley Attack
        ui.notifications.warn("Missile Volley Attack Not Implemented");
    }

    directAttack(
        speaker = null,
        actor = null,
        token = null,
        character = null,
        {
            skipDialog = false,
            noChat = false,
            type = `${this.type}-${this.name}-direct-missile-attack`,
            title = `${this.item.label} Direct Missile Attack`,
            // biome-ignore lint/correctness/noUnusedVariables: <explanation>
            ...scope
        },
    ) {
        ({ speaker, actor, token, character } =
            sohl.SohlMacro.getExecuteDefaults({
                speaker,
                actor,
                token,
                character,
            }));

        // TODO - Missile Direct Attack
        ui.notifications.warn("Missile Direct Attack Not Implemented");
    }

    /** @override */
    prepareBaseData() {
        super.prepareBaseData();
        foundry.utils.mergeObject(this.$traits, {
            armorReduction: 0,
            bleed: false,
        });
        this.$maxVolleyMult = new sohl.ValueModifier(this).setBase(
            this.maxVolleyMult,
        );
        this.$baseRange = new sohl.ValueModifier(this).setBase(
            this.baseRangeBase,
        );
        this.$draw = new sohl.ValueModifier(this).setBase(this.drawBase);
        this.$pull = new sohl.ValueModifier(this);
    }

    postProcess() {
        super.postProcess();
        const strength = this.actor.getTraitByAbbrev("str");
        if (strength) {
            const strML = strength.system.$masteryLevel?.effective || 0;
            this.$pull.add("Strength ML", "StrML", strML);
        }
        if (this.$assocSkill) {
            this.$pull.add(
                `${this.$assocSkill.name}`,
                "AssocSkill",
                this.$assocSkill.system.$masteryLevel.effective,
            );
        }

        this.$canDraw =
            !this.$pull.disabled &&
            this.$pull.effective >= this.$draw.effective;
        this.$attack.disabled ||= !this.$canDraw;
    }
}

class LgndCombatTechniqueStrikeModeItemData extends LgndStrikeModeItemDataMixin(
    sohl.CombatTechniqueStrikeModeItemData,
) {
    static get effectKeys() {
        return sohl.Utility.simpleMerge(super.effectKeys, {
            "system.$traits.strRoll": {
                label: "Strength Roll",
                abbrev: "StrRoll",
            },
        });
    }

    get intrinsicActions() {
        let actions = super.intrinsicActions
            .filter((a) => a.name !== "attack")
            .map((a) => {
                if (
                    a.contextGroup === sohl.SohlContextMenu.sortGroups.Default
                ) {
                    a.contextGroup = sohl.SohlContextMenu.sortGroups.Primary;
                }
                return a;
            });

        actions.push({
            functionName: "assistedAttack",
            name: "Automated Attack",
            contextIconClass: "fas fa-hand-fist fa-rotate-90",
            contextCondition: (header) => {
                header = header instanceof HTMLElement ? header : header[0];
                const li = header.closest(".item");
                const item = fromUuidSync(li.dataset.uuid);
                return item && !item.system.$attack.disabled;
            },
            contextGroup: sohl.SohlContextMenu.sortGroups.Default,
        });

        actions.sort((a, b) => a.contextGroup.localeCompare(b.contextGroup));
        return actions;
    }

    async automatedAttack(
        speaker = null,
        actor = null,
        token = null,
        character = null,
        {
            skipDialog = false,
            noChat = false,
            type = `${this.type}-${this.name}-bleed-stop-test`,
            title = `${this.item.label} Bleeding Stoppage Test`,
            // biome-ignore lint/correctness/noUnusedVariables: <explanation>
            ...scope
        },
    ) {
        ({ speaker, actor, token, character } =
            sohl.SohlMacro.getExecuteDefaults({
                speaker,
                actor,
                token,
                character,
            }));

        // TODO - Combat Technique Automated Attack
        ui.notifications.warn(
            "Combat Technique Automated Attack Not Implemented",
        );
    }

    /** @override */
    prepareBaseData() {
        super.prepareBaseData();
        foundry.utils.mergeObject(this.$traits, {
            strRoll: false,
        });
    }

    processSiblings() {
        super.processSiblings();
        const strength = this.actor.getTraitByAbbrev("str");
        if (strength) {
            const strValue = strength.system.$score?.effective || 0;
            const strImpactMod = LgndUtility.strImpactMod(strValue);
            if (strImpactMod && !this.$traits.noStrMod) {
                this.$impact.add(
                    "Strength Impact Modifier",
                    "StrImpMod",
                    strImpactMod,
                );
            }
        }
    }
}

/*===============================================================*/
/*      Legendary Data Model Classes                                   */
/*===============================================================*/

function LgndMasteryLevelItemDataMixin(BaseMLID) {
    return class LgndMasteryLevelItemData extends BaseMLID {
        get isFateAllowed() {
            return (
                super.isFateAllowed &&
                !this.actor.system.$hasAuralShock &&
                !this.skillBaseFormula?.includes("@aur")
            );
        }

        /** @override */
        applyPenalties() {
            // Apply Encumbrance Penalty to Mastery Level
            const sbAttrs = this.skillBase.attributes;
            if (sbAttrs.at(0) === "Agility") {
                const enc = this.actor.system.$encumbrance.total;
                if (enc) this.$masteryLevel.add("Encumbrance", "Enc", -enc);
            }
        }

        prepareBaseData() {
            super.prepareBaseData();
            this.$masteryLevel &&= LgndMasteryLevelModifier.create(
                this.$masteryLevel,
                { parent: this },
            );
        }
    };
}

class LgndDomainItemData extends sohl.DomainItemData {}

class LgndInjuryItemData extends sohl.InjuryItemData {
    static get aspectTypes() {
        return {
            blunt: "Blunt",
            edged: "Edged",
            piercing: "Piercing",
            fire: "Fire",
            frost: "Frost",
            projectile: "Projectile",
        };
    }

    static calcZoneDieFormula(die, offset) {
        const result =
            (die ? "d" + die + (offset < 0 ? "" : "+") : "") + offset;
        return result;
    }

    get isBarbed() {
        return this.item.getFlag("sohl", "legendary.isBarbed");
    }

    set isBarbed(val) {
        this.item.setFlag("sohl", "legendary.isBarbed", !!val);
    }

    get isGlancing() {
        return this.item.getFlag("sohl", "legendary.isGlancing");
    }

    set isGlancing(val) {
        this.item.setFlag("sohl", "legendary.isGlancing", !!val);
    }

    get extraBleedRisk() {
        return this.item.getFlag("sohl", "legendary.extraBleedRisk");
    }

    set extraBleedRisk(val) {
        this.item.setFlag("sohl", "legendary.extraBleedRisk", !!val);
    }

    get permanentImpairment() {
        return this.item.getFlag("sohl", "legendary.permanentImpairment");
    }

    set permanentImpairment(val) {
        if (typeof val === "number") {
            val = Math.max(0, val);
            this.item.setFlag("sohl", "legendary.permanentImpairment", val);
        }
    }

    get untreatedHealing() {
        const treatSev = this.$healingRate?.severity;
        let treatmt = (treatSev !== "0"
            ? LGND.CONST.treatment[this.aspect]?.[treatSev]?.["cf"]
            : {
                  hr: 6,
                  infect: false,
                  impair: false,
                  bleed: false,
                  newInj: -1,
              }) || {
            hr: 5,
            infect: true,
            impair: false,
            bleed: false,
            newInj: -1,
        };
        return treatmt;
    }

    prepareBaseData() {
        super.prepareBaseData();
        const newIL = new sohl.ValueModifier(this, {
            severity: (thisVM) => {
                let severity;
                if (thisVM.effective <= 0) {
                    severity = "0";
                } else if (thisVM.effective == 1) {
                    severity = "M1";
                } else if (thisVM.effective <= 3) {
                    severity = `S${thisVM.effective}`;
                } else {
                    severity = `G${thisVM.effective}`;
                }
                return severity;
            },
        });
        this.$injuryLevel = newIL.addVM(this.$injuryLevel, {
            includeBase: true,
        });
    }
    /** @override */
    postProcess() {
        super.postProcess();
        if (!this.isInEffect) return;

        // Apply this injury as impairment to bodylocations
        const blItem = this.actor.items.find(
            (it) =>
                it.system instanceof sohl.BodyLocationItemData &&
                it.name === this.bodyLocation,
        );
        if (blItem) {
            const blData = blItem.system;
            if (this.injuryLevel.effective > 3) {
                blData.impairment.setProperty("unusable", true);
                blData.impairment.set(
                    `${this.item.name} Grevious Injury: Unusable`,
                    "GInjUnusable",
                    0,
                );
            } else if (this.injuryLevel.effective > 1) {
                blData.impairment.add(
                    `${this.item.name} Serious Injury`,
                    "SInj",
                    -10,
                );
            } else if (
                this.injuryLevel.effective > 0 &&
                this.healingRate.effective < 6 &&
                this.isInEffect
            ) {
                blData.impairment.add(
                    `${this.item.name} Minor Injury`,
                    "MInj",
                    -5,
                );
            }
        }

        //        const injuryDurationDays = Math.trunc((game.time.worldTime - this.item.system.createdTime) / 86400);
        if (this.alData.mayBePermanent) {
            //const permanentImpairment = Math.min(25, Math.trunc(injuryDurationDays / 20) * 5);
            // FIXME - Permanent Injury
        }
    }
}

class LgndMysticalAbilityItemData extends LgndMasteryLevelItemDataMixin(
    sohl.MysticalAbilityItemData,
) {}

class LgndTraitItemData extends sohl.TraitItemData {
    get actionBodyParts() {
        return this.item.getFlag("sohl", "legendary.actionBodyParts") || [];
    }

    get diceFormula() {
        return this.item.getFlag("sohl", "legendary.diceFormula");
    }

    prepareBaseData() {
        super.prepareBaseData();
        this.$masteryLevel &&= LgndMasteryLevelModifier.create(
            this.$masteryLevel,
            {
                parent: this,
            },
        );
    }

    processSiblings() {
        super.processSiblings();
        if (this.isNumeric) {
            this.actionBodyParts.forEach((bp) => {
                const bodyPart = sohl.IterWrap.create(
                    this.actor.allItems(),
                ).find(
                    (it) =>
                        it.system instanceof sohl.BodyPartItemData &&
                        it.name === bp,
                );
                if (bodyPart) {
                    if (bodyPart.system.$impairment.unusable) {
                        this.$masteryLevel.set(
                            `${this.item.name} Unusable`,
                            `${this.abbrev}Unusable`,
                            0,
                        );
                    } else if (bodyPart.system.$impairment.value) {
                        this.$masteryLevel.add(
                            `${this.item.name} Impairment`,
                            `${this.abbrev}Imp`,
                            bodyPart.system.$impairment.value,
                        );
                    }
                }
            });
        }

        if (this.intensity === "attribute" && this.subType === "physique") {
            sohl.IterWrap.create(this.actor.allItems()).forEach((it) => {
                if (
                    it.system instanceof sohl.AfflictionItemData &&
                    it.system.subType === "fatigue"
                ) {
                    this.$masteryLevel.add(
                        it.name,
                        it.system.constructor.subTypeAbbreviation[
                            it.system.subType
                        ],
                        -it.system.$level.effective,
                    );
                }
            });
        }
    }
}

class LgndSkillItemData extends LgndMasteryLevelItemDataMixin(
    sohl.SkillItemData,
) {
    get actionBodyParts() {
        return this.item.getFlag("sohl", "legendary.actionBodyParts") || [];
    }

    get initSM() {
        return this.item.getFlag("sohl", "legendary.initSM") || 0;
    }

    static get sunsignTypes() {
        return {
            social: "water",
            nature: "earth",
            craft: "metal",
            lore: "aura",
            language: "aura",
            script: "aura",
            ritual: "aura",
            physical: "air",
            combat: "fire",
            esoteric: null,
        };
    }

    processSiblings() {
        super.processSiblings();
        this.actionBodyParts.forEach((bp) => {
            const bodyPart = sohl.IterWrap.create(this.actor.allItems()).find(
                (it) =>
                    it.system instanceof sohl.BodyPartItemData &&
                    it.name === bp,
            );
            if (bodyPart) {
                if (bodyPart.system.$impairment.unusable) {
                    this.$masteryLevel.set(
                        `${this.item.name} Unusable`,
                        `${this.abbrev}Unusable`,
                        0,
                    );
                } else if (bodyPart.system.$impairment.value) {
                    this.$masteryLevel.add(
                        `${this.item.name} Impairment`,
                        `${this.abbrev}Imp`,
                        bodyPart.system.$impairment.value,
                    );
                }
            }
        });

        if (["craft", "combat", "physical"].includes(this.subType)) {
            sohl.IterWrap.create(this.actor.allItems()).forEach((it) => {
                if (
                    it.system instanceof sohl.AfflictionItemData &&
                    it.system.subType === "fatigue"
                ) {
                    this.$masteryLevel.add(
                        it.name,
                        it.system.constructor.subTypeAbbreviation[
                            it.system.subType
                        ],
                        -it.system.$level.effective,
                    );
                }
            });
        }
    }
}

class LgndAfflictionItemData extends sohl.AfflictionItemData {
    /** @override */
    setupVirtualItems() {
        super.setupVirtualItems();
        if (["privation", "infection"].includes(this.subType)) {
            let weakness = 0;
            if (this.$healingRate.effective <= 2) {
                weakness = 10;
            } else if (this.$healingRate.effective <= 4) {
                weakness = 5;
            }
            if (weakness) {
                this.item.constructor.create(
                    {
                        name: `${this.item.name} Fatigue`,
                        type: sohl.AfflictionItemData.typeName,
                        "system.subType": "weakness",
                        "system.fatigueBase": weakness,
                    },
                    { cause: this.item, parent: this.actor },
                );
            }
        }
    }
}

class LgndBodyZoneItemData extends sohl.BodyZoneItemData {
    // List of possible dice for Zone Dice.
    static get dice() {
        return {
            0: "None",
            1: "d1",
            2: "d2",
            3: "d3",
            4: "d4",
            5: "d5",
            6: "d6",
            8: "d8",
            10: "d10",
            12: "d12",
            16: "d16",
            20: "d20",
            24: "d24",
            32: "d32",
            40: "d40",
            48: "d48",
        };
    }

    get zoneNumbers() {
        return this.item.getFlag("sohl", "legendary.zones") || [];
    }

    set zoneNumbers(zones) {
        let result = [];
        if (Array.isArray(zones)) {
            result = zones;
        } else if (typeof zones === "string") {
            result = zones.split(/.*,.*/).reduce((ary, zone) => {
                const num = Number.parseInt(zone, 10);
                if (!Number.isNaN(num) && !ary.includes(num)) ary.push(num);
            }, result);
        } else {
            throw new Error(`Invalid zones '${zones}'`);
        }
        result.sort((a, b) => a - b);
        this.item.setFlag("sohl", "legendary.zones", result);
    }

    get zoneNumbersLabel() {
        return this.zoneNumbers.join(",");
    }

    get affectsMobility() {
        return !!this.item.getFlag("sohl", "legendary.affectsMobility");
    }

    get affectedSkills() {
        return this.item.getFlag("sohl", "legendary.affectedSkills") || [];
    }

    get affectedAttributes() {
        return this.item.getFlag("sohl", "legendary.affectedAttributes") || [];
    }

    static get maxZoneDie() {
        return Object.values(this.dice).at(-1);
    }

    /** @override */
    processSiblings() {
        super.processSiblings();
        this.actor.maxZones = Math.max(
            this.actor.system.maxZones,
            ...this.zoneNumbers,
        );
    }
}

class LgndBodyPartItemData extends sohl.BodyPartItemData {
    /**
     * Represents body part impairment based on injuries.
     * If body part is injured, impairment will be less than
     * zero.  Values greater than zero are treated as zero
     * impairment.
     *
     * @type {ValueModifier}
     */
    $impairment;

    /** @override */
    prepareBaseData() {
        super.prepareBaseData();
        this.$impairment = new sohl.ValueModifier(this, {
            unusable: false,
            value: (thisVM) => {
                Math.min(thisVM.effective, 0);
            },
        });
    }

    /** @override */
    processSiblings() {
        super.processSiblings();
        this.actor.system.$health.max += this.$health.effective;

        // Add this body part's health to overall actor health.
        // If this body part is unusable, or impairment is < -10,
        // then none of the body part health is added to the
        // actor health.
        if (!this.$impairment.unusable) {
            if (!this.$impairment.value) {
                // If no impairment, then add full body part health
                this.actor.system.$health.add(
                    `${this.item.name} Impairment`,
                    "Impair",
                    this.$health.effective,
                );
            } else if (this.$impairment.effective >= -5) {
                // If minor impairment, then add half body part health
                this.actor.system.$health.add(
                    `${this.item.name} Impairment`,
                    "Impair",
                    Math.floor(this.$health.effective / 2),
                );
            } else if (this.$impairment.value >= -10) {
                // If major impairment, then add 1/4 body part health
                this.actor.system.$health.add(
                    `${this.item.name} Impairment`,
                    "Impair",
                    Math.floor(this.$health.effective / 4),
                );
            }
        } else {
            // Body parts marked "unusable" can never hold anything.
            if (this.heldItem?.system instanceof sohl.GearItemData) {
                if (this.heldItem.system.isHeldBy.includes(this.item.id)) {
                    ui.notifications.warn(
                        `${this.item.name} is unusable, so dropping everything being held in the body part`,
                    );
                    this.update({ "system.heldItem": "" });
                }
            }
        }
    }
}

class LgndBodyLocationItemData extends sohl.BodyLocationItemData {
    $impairment;

    get isRigid() {
        return this.item.getFlag("sohl", "legendary.bleedingSevThreshold");
    }

    get bleedingSevThreshold() {
        return this.item.getFlag("sohl", "legendary.isRigid");
    }

    get amputatePenalty() {
        return this.item.getFlag("sohl", "legendary.amputatePenalty");
    }

    get shockValue() {
        return this.item.getFlag("sohl", "legendary.shockValue");
    }

    /** @override */
    prepareBaseData() {
        super.prepareBaseData();
        this.$impairment = new sohl.ValueModifier(this, { unusable: false });
    }

    prepareSiblings() {
        super.prepareSiblings();
        // biome-ignore lint/correctness/noUnusedVariables: <explanation>
        let thisIsUnusable = this.$impairment.unusable;

        const bpItem = this.item.nestedIn;
        if (bpItem) {
            const bpImp = bpItem.system.$impairment;
            if (this.$impairment.effective) {
                bpImp.addVM(this.$impairment);
            }

            if (this.$impairment.unusable) {
                bpImp.$impairment.unusable = true;
            }
        }
    }
}

class LgndArmorGearItemData extends sohl.ArmorGearItemData {
    $encumbrance;

    static get effectKeys() {
        return sohl.Utility.simpleMerge(super.effectKeys, super.effectKeys, {
            "system.$encumbrance": {
                label: "Encumbrance",
                abbrev: "Enc",
            },
        });
    }

    get encumbrance() {
        return this.item.getFlag("sohl", "legendary.encumbrance") || 0;
    }

    /** @override */
    prepareBaseData() {
        super.prepareBaseData();

        this.$encumbrance = new sohl.ValueModifier(this);
        this.$encumbrance.setBase(this.encumbrance);

        // Armor, when equipped, is weightless
        if (this.isEquipped) {
            this.$weight.setBase(0);
        }
    }

    /** @override */
    processSiblings() {
        super.processSiblings();

        if (this.$encumbrance && this.isEquipped) {
            // Armor, when worn, may have an encumbrance effect.  If present, use it.
            this.actor.system.$encumbrance.add(
                `this.item.name Encumbrance`,
                "Enc",
                this.$encumbrance,
            );
        }
    }
}
class LgndWeaponGearItemData extends sohl.WeaponGearItemData {
    $length;
    $heft;

    get lengthBase() {
        return this.item.getFlag("sohl", "legendary.lengthBase") || 0;
    }

    get heftBase() {
        return this.item.getFlag("sohl", "legendary.heftBase") || 0;
    }

    prepareBaseData() {
        super.prepareBaseData();

        this.$length = new sohl.ValueModifier(this);
        this.$length.setBase(this.lengthBase);

        this.$heft = new sohl.ValueModifier(this);
        this.$heft.setBase(this.heftBase);
    }

    setupVirtualItems() {
        super.setupVirtualItems();
        this.items.forEach((it) => {
            if (
                !it.system.transfer &&
                it.system instanceof sohl.MissileWeaponStrikeModeItemData
            ) {
                const missileSM = it;
                if (
                    missileSM.system.projectileType &&
                    missileSM.system.projectileType !== "none"
                ) {
                    this.actor.itemTypes.projectilegear.forEach((proj, idx) => {
                        if (
                            proj.system.quantity > 0 &&
                            proj.system.subType ===
                                missileSM.system.projectileType
                        ) {
                            const itemData = missileSM.toObject();
                            itemData._id = foundry.utils.randomID();
                            itemData.sort += idx;
                            if (proj.system.impactBase.die >= 0) {
                                itemData.system.impactBase.die =
                                    proj.system.impactBase.die;
                            }
                            if (proj.system.impactBase.aspect) {
                                itemData.system.impactBase.aspect =
                                    proj.system.impactBase.aspect;
                            }
                            if (proj.system.impactBase.modifier >= 0) {
                                itemData.system.impactBase.modifier =
                                    proj.system.impactBase.modifier;
                            }
                            itemData.name = proj.name;

                            itemData.effects.push(
                                ...proj.effects.contents.map((e) =>
                                    e.toObject(),
                                ),
                            );
                            const item = new sohl.SohlItem(itemData, {
                                parent: this.item.actor,
                            });
                            item.cause = this.item;
                        }
                    });
                }
            }
        });
    }
}

/*===============================================================*/
/*      Legendary Classes                                              */
/*===============================================================*/

export class LgndTour extends Tour {
    actor;
    item;

    async _preStep() {
        await super._preStep();
        const currentStep = this.currentStep;

        if (currentStep.actor) {
            this.actor = await CONFIG.Actor.documentClass.create(
                currentStep.actor,
            );
            await this.actor.sheet?._render(true);
        }

        if (currentStep.itemName) {
            if (!this.actor) {
                console.warn("No actor found for step " + currentStep.title);
            }
            this.item = this.actor?.items.getName(currentStep.itemName);
            const app = this.item.sheet;
            if (!app.rendered) {
                await app._render(true);
            }
            currentStep.selector = currentStep.selector?.replace(
                "itemSheetID",
                app.id,
            );
        }

        if (currentStep.tab) {
            switch (currentStep.tab.parent) {
                case LGND.CONST.TOUR_TAB_PARENTS.ACTOR: {
                    if (!this.actor) {
                        console.warn("No Actor Found");
                        break;
                    }
                    const app = this.actor.sheet;
                    app?.activateTab(currentStep.tab.id);
                    break;
                }

                case LGND.CONST.TOUR_TAB_PARENTS.ITEM: {
                    if (!this.item) {
                        console.warn("No Item Found");
                        break;
                    }
                    const app = this.item.sheet;
                    app?.activateTab(currentStep.tab.id);
                    break;
                }
            }
        }
        currentStep.selector = currentStep.selector?.replace(
            "actorSheetID",
            this.actor?.sheet?.id,
        );
    }
}

// class LgndCommand {

//     /**
//      * Try several things to determine what the current actor is.  These include: (1) if UUID is specified, find
//      * the actor with that UUID; (2) If there is a combat ongoing, and if the current combatant is owned, then
//      * select that actor, or (3) if there is a character defined in the user profile, choose that actor.
//      *
//      * @param {string} actorId
//      * @returns The Actor that was identified.
//      */
//     getActor(actorId = null) {
//         let actor = null;

//         if (actorId) {
//             actor = fromUuidSync(actorId);
//             if (!actor) {
//                 ui.notifications.warn(`Cannot find actor with UUID ${actorId}`);
//                 return null;
//             }
//         } else {
//             // We have to guess which actor to select.
//             // If in combat, then choose the combatant whose turn it is
//             actor = game.combat?.combatant?.actor;
//             if (!actor?.isOwner) {
//                 // If we're not an owner of the current combatant (or we are not in combat), then
//                 // fallback to our "user character" (if defined)
//                 actor = game.user.character;
//                 if (!actor) {
//                     const msg = `Cannot identify a default character; please consider defining your default character in your user profile.`;
//                     console.warn(`sohl.SoHL | ${msg}`);
//                     ui.notifications.warn(msg);
//                     return null;
//                 }
//             }
//         }

//         return actor;
//     }
// }

// class LgndHotbar {
//     /**
//      * Create a script macro from an Item drop.
//      * Get an existing item macro if one exists, otherwise create a new one.
//      * @param {object} data     The dropped data
//      * @param {number} slot     The hotbar slot to use
//      * @returns {Promise}
//      */
//     static createLgndMacro(data, slot) {
//         if (data.type !== "Item") return true;  // Continue normal processing for non-Item documents
//         handleItemMacro(data, slot);
//         return false;
//     }

//     static async handleItemMacro(data, slot) {
//         const item = await fromUuid(data.uuid);
//         if (!item?.system) {
//             ui.notifications.warn("No macro exists for that type of object.");
//             return null;
//         }

//         let title = item.name;
//         if (item.actor) {
//             title = `${item.actor.name}'s ${item.name}`;
//         }

//         let cmdSuffix;
//         switch (item.type) {
//             case sohl.ArtifactRulesetSkillItemData.typeName:
//                 cmdSuffix = `skillRoll("${item.uuid}");`;
//                 break;

//             case sohl.MysticalAbilityItemData.typeName:
//                 cmdSuffix = `castSpellRoll("${item.uuid}");`;
//                 break;

//             case LgndWeaponGearItemData.typeName:
//                 return await askWeaponMacro(item.uuid, slot, item.img);

//             case InjuryItemData.typeName:
//                 cmdSuffix = `healingRoll("${item.name}");`;
//                 break;

//             default:
//                 return null;  // Unhandled item, so ignore
//         }

//         return await applyMacro(title, `await game.sohl.macros.${cmdSuffix}`, slot, item.img, { "hm3.itemMacro": false });
//     }

//     static async applyMacro(name, command, slot, img, flags) {
//         let macro = [game.legendary.cmds.values()].find(m => (m.name === name) && (m.command === command));
//         if (!macro) {
//             macro = await Macro.create({
//                 name: name,
//                 type: "script",
//                 img: img,
//                 command: command,
//                 flags: flags
//             });
//         }
//         game.user.assignHotbarMacro(macro, slot);
//         return null;
//     }

//     static askWeaponMacro(weaponUuid, slot, img) {
//         const item = fromUuidSync(weaponUuid);
//         if (!item) {
//             ui.notifications.warn(`No weapon with Uuid ${weaponUuid}`);
//         }

//         const dlghtml = '<p>Select the type of weapon macro to create:</p>';

//         let actorName = "";
//         if (item.actor) {
//             actorName = `${item.actor.name}'s `;
//         }

//         // Create the dialog window
//         return new Promise(resolve => {
//             new Dialog({
//                 title: 'Select Weapon Macro',
//                 content: dlghtml.trim(),
//                 buttons: {
//                     enhAttackButton: {
//                         label: "Automated Combat",
//                         callback: async (html) => {
//                             return await applyMacro(`${item.name} Automated Combat`, `await game.sohl.macros.weaponAttack("${weaponUuid}");`, slot, img, { "hm3.itemMacro": false });
//                         }
//                     },
//                     attackButton: {
//                         label: "Attack",
//                         callback: async (html) => {
//                             return await applyMacro(`${actorName}${item.name} Attack Roll`, `await game.sohl.macros.weaponAttackRoll("${weaponUuid}");`, slot, img, { "hm3.itemMacro": false });
//                         }
//                     },
//                     defendButton: {
//                         label: "Defend",
//                         callback: async (html) => {
//                             return await applyMacro(`${actorName}${item.name} Defend Roll`, `await game.sohl.macros.weaponDefendRoll("${weaponUuid}");`, slot, img, { "hm3.itemMacro": false });
//                         }
//                     },
//                     damageButton: {
//                         label: "Damage",
//                         callback: async (html) => {
//                             return await applyMacro(`${actorName}${item.name} Damage Roll`, `await game.sohl.macros.weaponDamageRoll("${weaponUuid}");`, slot, img, { "hm3.itemMacro": false });
//                         }
//                     }
//                 },
//                 default: "enhAttackButton",
//                 close: () => resolve(false)
//             }).render(true)
//         });
//     }

//     static askMissileMacro(name, slot, img, actorSuffix) {
//         const dlghtml = '<p>Select the type of missile macro to create:</p>'

//         // Create the dialog window
//         return new Promise(resolve => {
//             new Dialog({
//                 title: 'Select Missile Macro',
//                 content: dlghtml.trim(),
//                 buttons: {
//                     enhAttackButton: {
//                         label: "Automated Combat",
//                         callback: async (html) => {
//                             return await applyMacro(`${name} Automated Combat`, `game.sohl.macros.missileAttack("${name}");`, slot, img, { "hm3.itemMacro": false });
//                         }
//                     },
//                     attackButton: {
//                         label: "Attack",
//                         callback: async (html) => {
//                             return await applyMacro(`${actorName}'s ${name} Attack Roll`, `game.sohl.macros.missileAttackRoll("${name}"${actorSuffix});`, slot, img, { "hm3.itemMacro": false });
//                         }
//                     },
//                     damageButton: {
//                         label: "Damage",
//                         callback: async (html) => {
//                             return await applyMacro(`${actorName}'s ${name} Damage Roll`, `game.sohl.macros.missileDamageRoll("${name}"${actorSuffix});`, slot, img, { "hm3.itemMacro": false });
//                         }
//                     }
//                 },
//                 default: "enhAttackButton",
//                 close: () => resolve(false)
//             }).render(true)
//         });
//     }
// }

export class LgndUtility extends sohl.Utility {
    static strImpactMod(str) {
        if (typeof str !== "number") return -10;
        return str > 5
            ? Math.trunc(str / 2) - 5
            : [-10, -10, -8, -6, -4, -3].at(Math.max(str, 0));
    }
}

//     /* ------------------------------------------------------------ */
//     /*   Miscellaneous Tests                                        */
//     /* ------------------------------------------------------------ */

//     /**
//      * Perform a shock test and display a chat card with the results of the test.
//      *
//      * @param {object} [options={}] Options which specify how to perform the test
//      * @param {number} [options.shockIndex=0] Default shock index to start with
//      * @param {boolean} [options.skipDialog=false] Do not present dialog, use default behavior
//      * @returns Object containing the results of the test
//      *
//      * @override
//      */
//     async shockTest({ shockIndex = 0, skipDialog = false } = {}) {
//         // This function does not use the standard d100StdRoll function, since it also includes
//         // the ShockIndex.  So we do all the calculation here.

//         const mods = LgndCombatModifier.create(this, this.actor.getCombatStat('Shock'));

//         const rollData = {
//             diceSize: 100,
//             diceNum: 1,
//             mod: mods,
//             shockIndex,
//             title: `Shock Test`,
//             type: 'shock'
//         };

//         // Shock rolls are never affected by Stun penalties
//         // Also, shock rolls are never affected by impairment penalties, only fatigue

//         if (!skipDialog) {
//             // Render modal dialog
//             let dlgTemplate = "systems/sohl/templates/dialog/shock-test-dialog.html";
//             let dialogData = {
//                 target: rollData.mod.effective,
//                 mods: rollData.mod.mods,
//                 modifier: 0,
//                 shockIndex: rollData.shockIndex,
//                 successLevelMod: rollData.mod.successLevelMod
//             };
//             const html = await renderTemplate(dlgTemplate, dialogData);

//             // Create the dialog window
//             const dlgResult = await Dialog.prompt({
//                 title: rollData.title,
//                 content: html.trim(),
//                 label: "Shock Test",
//                 callback: html => {
//                     const form = html[0].querySelector("form");
//                     const formModifier = Number.parseInt(form.modifier.value, 10);
//                     const formSuccessLevelMod = Number.parseInt(form.successLevelMod.value, 10);
//                     const formShockIndex = Number.parseInt(form.shockIndex.value, 10);
//                     if (formModifier) {
//                         dialogData.add("Player Modifier", 'PlyrMod', formModifier);
//                     }
//                     const rollTestData = {
//                         mods: dialogData.mods,
//                         successLevelMod: formSuccessLevelMod,
//                         shockIndex: formShockIndex
//                     };
//                     return rollTestData;
//                 },
//                 rejectClose: false
//             });
//             if (!dlgResult) return null;

//             rollData.mod.mods = dlgResult.mods;
//             rollData.mod.successLevelMod = dlgResult.successLevelMod;
//             rollData.shockIndex = dlgResult.shockIndex;
//             LgndUtility.applyMods(rollData.mod);
//         }

//         const roll = await LgndDice.rollTest(rollData);
//         if (!roll) return null;

//         // Prepare for Chat Message
//         const chatTemplate = 'systems/sohl/templates/chat/shock-card.html';

//         const shockRollMod = 1 - roll.successLevel;
//         const curShock = this.system.shock;
//         let finalShockIndex = rollData.shockIndex + shockRollMod;

//         const shockText = Object.keys(LGND.CONST.SHOCK);

//         const chatTemplateData = {
//             title: rollData.title,
//             origShockML: rollData.mod.basis,
//             shockML: roll.target,
//             shockTestMod: Math.abs(rollData.mod.effMod),
//             stPlusMinus: rollData.mod.effMod < 0 ? '-' : '+',
//             curShock: shockText[curShock],
//             successLevelMod: roll.successLevelMod,
//             shockRollMod: Math.abs(shockRollMod),
//             siPlusMinus: shockRollMod < 0 ? '-' : '+',
//             origShockIndex: rollData.shockIndex,
//             finalShockIndex,
//             stRollValue: roll.rollObj.total,
//             shockText: 'No change',
//             shockUpgradeText: '',
//             description: roll.description,
//             isSuccess: roll.isSuccess,
//             isCritical: roll.isCritical,
//             isCS: roll.isSuccess && roll.isCritical,
//             isMS: roll.isSuccess && !roll.isCritical,
//             isMF: !roll.isSuccess && !roll.isCritical,
//             isCF: !roll.isSuccess && roll.isCritical
//         };

//         if (finalShockIndex >= 10) {
//             chatTemplateData.shockText = shockText[LGND.CONST.SHOCK.Killed];
//         } else if (finalShockIndex === 9) {
//             chatTemplateData.shockText = shockText[LGND.CONST.SHOCK.Unconscious];
//         } else if (finalShockIndex === 8) {
//             if (curShock === LGND.CONST.SHOCK.Incapacitated) {
//                 chatTemplateData.shockText = shockText[LGND.CONST.SHOCK.Unconscious];
//                 chatTemplateData.shockUpgradeText = "Incapacitated result when already incapacitated changes to Unconscious"
//             } else {
//                 chatTemplateData.shockText = shockText[LGND.CONST.SHOCK.Incapacitated];
//             }
//         } else if (finalShockIndex === 7) {
//             if (curShock === LGND.CONST.SHOCK.Stunned) {
//                 chatTemplateData.shockText = shockText[LGND.CONST.SHOCK.Incapacitated];
//                 chatTemplateData.shockUpgradeText = "Stunned result when already stunned changes to Incapacitated"
//             } else {
//                 chatTemplateData.shockText = shockText[LGND.CONST.SHOCK.Stunned];
//             }
//         }

//         chatTemplateData.finalShockIndex = finalShockIndex;

//         const html = await renderTemplate(chatTemplate, chatTemplateData);

//         const messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.ROLL,
//             sound: CONFIG.sounds.dice,
//             roll: roll.rollObj
//         };

//         const messageOptions = {
//             rollMode: game.settings.get("core", "rollMode")
//         };

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions)

//         return chatTemplateData;
//     }

//     /**
//      * Perform a shock re-test and display a chat card with the results of the test.
//      *
//      * @param {object} [options={}] Options which specify how to perform the test
//      * @param {boolean} [options.skipDialog=false] Do not present dialog, use default behavior
//      * @returns Object containing the results of the test
//      *
//      * @override
//      */
//     async shockReTest({ skipDialog = false } = {}) {
//         const extraMods = LgndUtility.addMod([], 'Shock Re-Test', 'ShkRT', -20);

//         const shockSkill = this.itemTypes.skill.find(it => it.name === 'Shock');
//         if (!shockSkill) {
//             const msg = `${this.isToken ? this.token.name : this.name} does not have the Shock skill, can't perform Shock Re-Test`;
//             ui.notifications.warn(msg);
//             console.warn(`sohl.SoHL | ${msg}`);
//             return null;
//         }

//         const skillRollResult = await this.skillTest(shockSkill, {
//             skipDialog,
//             noChat: true,
//             extraMods
//         });
//         if (!skillRollResult) return null;

//         skillRollResult.title = 'Shock Re-Test';

//         if (skillRollResult.isCritical) {
//             if (skillRollResult.isSuccess) {
//                 skillRollResult.resultText = 'Shock Removed';
//                 skillRollResult.resultDesc = "Character's Shock State is Removed";
//             } else {
//                 if (skillRollResult.lastDigit === 5) {
//                     skillRollResult.resultText = 'Extended Shock';
//                     skillRollResult.resultDesc = 'Character suffers Extended Shock (HR4)';
//                 } else {
//                     skillRollResult.resultText = 'Extended Shock';
//                     skillRollResult.resultDesc = 'Character suffers Extended Shock (HR4)';
//                 }

//                 if (this.effects.has(LGND.CONST.STATUSEFFECTS.UNCONSCIOUS)) {
//                     skillRollResult.resultText += ' and Coma';
//                     skillRollResult.resultDesc += ' and lapses into a Coma';
//                 }
//             }
//         } else {
//             if (skillRollResult.isSuccess) {
//                 skillRollResult.resultText = 'Stunned';
//                 skillRollResult.resultDesc = "Character's Shock State changes to Stunned";
//             } else if (!skillRollResult.isSuccess) {
//                 skillRollResult.resultText = 'Extended Shock';
//                 skillRollResult.resultDesc = 'Character suffers Extended Shock (HR4)';
//             }
//         }

//         const chatTemplate = 'systems/sohl/templates/chat/standard-test-card.html';

//         const html = await renderTemplate(chatTemplate, skillRollResult);

//         const messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.ROLL,
//             sound: CONFIG.sounds.dice,
//             roll: skillRollResult.roll.rollObj
//         };

//         const messageOptions = {
//             rollMode: game.settings.get("core", "rollMode")
//         };

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions)

//         return skillRollResult;
//     }

//     /**
//      * Perform a treatment test display a chat card with the results of the test. No update of injuries are performed.
//      *
//      * @param {object} [options={}] Options which specify how to perform the test
//      * @returns Object containing the results of the test
//      *
//      * @override
//      */
//     async treatmentTest(options = {}) {
//         // Get important injury info: severity and aspect
//         const dlgHtml = `
//         <form>
//             <div class="form-group">
//                 <label>Aspect:</label>
//                 <select name="aspect">
//                     <option value="Blunt">Blunt</option>
//                     <option value="Edged">Edged</option>
//                     <option value="Piercing">Piercing</option>
//                     <option value="Projectile">Projectile</option>
//                     <option value="Fire">Fire</option>
//                     <option value="Frost">Frost</option>
//                 </select>
//             </div>

//             <div class="form-group">
//                 <label>Severity:</label>
//                 <select name="severity">
//                     <option value="M">Minor</option>
//                     <option value="S">Serious</option>
//                     <option value="G">Grevious</option>
//                 </select>
//             </div>
//         </form>`;

//         // Pop up the dialog to get the defender's data
//         const dlgResult = await Dialog.prompt({
//             title: "Injury Information",
//             content: dlgHtml.trim(),
//             label: "OK",
//             callback: html => {
//                 const form = html[0].querySelector("form");
//                 const result = {
//                     aspect: form.aspect.value,
//                     severity: form.severity.value
//                 }
//                 return result;
//             },
//             rejectClose: false
//         });

//         // If dialog cancelled then quit
//         if (!dlgResult) return null;
//         const aspect = dlgResult.aspect;
//         const severity = dlgResult.severity;
//         const treatBase = LGND.CONST.treatment[aspect][severity];

//         const confirmTreatment = await Dialog.confirm({
//             title: "Confirm Treatment",
//             content: `<p>Please confirm you have the necessary materials and equipment
//                 to perform ${treatBase.treatment} on the patient.</p>`,
//             defaultYes: true,
//             rejectClose: false
//         });
//         if (!confirmTreatment) return null;

//         let treatmentMods = treatBase.mod ? LgndUtility.addMod([], treatBase.mod.name, treatBase.mod.abbr, treatBase.mod.value) : [];
//         if (aspect === 'Projectile') {
//             if (severity === 'S') {
//                 LgndUtility.addMod(treatmentMods, 'Broadhead Penalty', 'BrdPnlt', -20);
//             } else if (severity === 'G') {
//                 LgndUtility.addMod(treatmentMods, 'Broadhead Penalty', 'BrdPnlt', -30);
//             }
//         }

//         if (treatBase.useDexMod) {
//             const attr = this.itemTypes.trait.find(trait => trait.name === 'Dexterity')?.system;
//             if (attr) LgndUtility.addMod(treatmentMods, 'Dexterity Secondary Modifier', 'Dex2Mod', attr.targetLevel.secMod);
//         }

//         const skillRollResult = await this.skillTest("Physician", {
//             label: 'Treatment Test',
//             noChat: true
//         });
//         if (!skillRollResult) return null;

//         skillRollResult.title = 'Treatment Test';
//         let treatBaseResult;
//         if (skillRollResult.isSuccess) {
//             if (skillRollResult.isCritical) {
//                 treatBaseResult = treatBase.cs;
//             } else {
//                 treatBaseResult = treatBase.ms;
//             }
//         } else {
//             if (skillRollResult.isCritical) {
//                 treatBaseResult = treatBase.cf;
//             } else {
//                 treatBaseResult = treatBase.mf;
//             }
//         }

//         skillRollResult.resultText = treatBaseResult.hr < 0 ? 'Healed' : `Heal Rate H${treatBaseResult.hr}`;
//         skillRollResult.resultDesc = `Treatment is ${treatBase.treatment}.`;
//         if (treatBaseResult.infect) skillRollResult.resultDesc += ' NOTE: Infection risk.';
//         if (treatBaseResult.impair) skillRollResult.resultDesc += ' NOTE: Permanent impairment risk.';
//         if (treatBaseResult.bleed) skillRollResult.resultDesc += ' NOTE: Treatment results in a bleeder.';
//         if (treatBaseResult.newInj > 0) {
//             const newsev = treatBaseResult.newInj > 3 ? "G" : (treatBaseResult.newInj > 1 ? "S" : "M");
//             skillRollResult.resultDesc += ' NOTE: Amputation results in a new ${newsev}${treatBaseResult.newInj} edged injury.';
//         }

//         // const chatTemplateData = foundry.utils.mergeObject({
//         //     severity: severity === 'G' ? 'Grevious' : (severity === 'S' ? 'Serious' : 'Minor'),
//         //     aspect,
//         //     treatment: treatBase.treatment,
//         //     useDexMod: treatBase.useDexMod,
//         //     newSev: treatBaseResult.newInj > 3 ? "G" : (treatBaseResult.newInj > 1 ? "S" : "M"),
//         // }, treatBaseResult);

//         //    const chatTemplate = 'systems/sohl/templates/chat/treatment-result-card.html';
//         const chatTemplate = 'systems/sohl/templates/chat/standard-test-card.html';

//         const html = await renderTemplate(chatTemplate, skillRollResult);

//         const messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.OTHER
//         };

//         // Create a chat message
//         await ChatMessage.create(messageData);

//         return skillRollResult;
//     }

//     /**
//      * Perform a fear test and display a chat card with the results of the test. If applicable, a new fear stress item will be created.
//      *
//      * @param {string} fearName Stress item representing fear
//      * @param {object} [options={}] Options which specify how to perform the test
//      * @param {boolean} [options.skipDialog=false] Do not present dialog, use default behavior
//      * @returns Object containing the results of the test
//      *
//      * @override
//      */
//     async fearTest(fearName, { skipDialog = false } = {}) {
//         let fearItem = fearName ? this.getItem(fearName, { types: [sohl.StressItemData.typeName] }) : null;

//         if (fearItem) {
//             if (fearItem.system.type !== 'Fear') {
//                 throw new Error(`sohl.SoHL | Stress item ${fearItem.name} is of type '${fearItem.system.type}', not Fear`);
//             }
//         } else {
//             let dlgHtml = `
//             <form>
//                 <div class="form-group">
//                     <label>Fear Sources:</label>
//                     <select name="source">
//                         <option value="New">New</option>`;
//             const fearItems = this.items.filter(it => it.system instanceof sohl.StressItemData && it.system.type === 'Fear');
//             fearItems.forEach(fear => {
//                 dlgHtml += `<option value="${fear.id}">${fear.name}</option>`;
//             });
//             dlgHtml += '</select></div></form>';
//             const dlgResult = await Dialog.prompt({
//                 title: 'Select Fear Source',
//                 content: dlgHtml.trim(),
//                 label: 'OK',
//                 callback: html => {
//                     const form = html[0].querySelector("form");
//                     return form.source.value;
//                 },
//                 rejectClose: false
//             });
//             if (!dlgResult) return null;
//             if (dlgResult !== 'New') {
//                 fearItem = this.getItem(dlgResult, { types: [sohl.StressItemData.typeName] });
//             } else {
//                 const name = sohl.SohlActorSheet._createUniqueName('New Fear', this.itemTypes.stress);
//                 fearItem = {
//                     name: name,
//                     type: sohl.StressItemData.typeName,
//                     system: {
//                         type: 'Fear',
//                         level: {
//                             base: sohl.StressItemData.fearLevels.Steady,
//                             mods: LgndUtility.setModBase(sohl.StressItemData.fearLevels.Steady)
//                         },
//                         nextCheckTime: game.time.worldTime,
//                         createdTime: game.time.worldTime
//                     }
//                 };
//                 LgndUtility.applyMods(fearItem.system.level);
//             }
//         }

//         const oldFearLevel = fearItem.system.level.effective;
//         const fearStates = Object.keys(sohl.StressItemData.fearLevels);

//         const attrRollResult = await this.attributeTest("Will", {
//             skipDialog,
//             label: 'Fear Test',
//             noChat: true
//         });
//         const name = this.isToken ? this.token.name : this.name
//         let newFearLevel = sohl.StressItemData.fearLevels.Steady;
//         let addInspiredAE = false;

//         if (attrRollResult.isCritical) {
//             if (attrRollResult.isSuccess) {
//                 attrRollResult.resultText = fearStates[sohl.StressItemData.fearLevels.Brave];
//                 attrRollResult.resultDesc = '';
//                 addInspiredAE = true;
//                 newFearLevel = sohl.StressItemData.fearLevels.Brave;
//             } else {
//                 if (attrRollResult.lastDigit === 5) {
//                     attrRollResult.resultText = fearStates[sohl.StressItemData.fearLevels.Terrified];
//                     attrRollResult.resultDesc = '';
//                     newFearLevel = sohl.StressItemData.fearLevels.Terrified;
//                 } else {
//                     attrRollResult.resultText = fearStates[sohl.StressItemData.fearLevels.Catatonic];
//                     attrRollResult.resultDesc = '';
//                     newFearLevel = sohl.StressItemData.fearLevels.Catatonic;
//                 }
//             }
//         } else {
//             if (attrRollResult.isSuccess) {
//                 attrRollResult.resultText = fearStates[sohl.StressItemData.fearLevels.Steady];
//                 attrRollResult.resultDesc = '';
//                 newFearLevel = sohl.StressItemData.fearLevels.Steady;
//             } else {
//                 attrRollResult.resultText = fearStates[sohl.StressItemData.fearLevels.Afraid];
//                 attrRollResult.resultDesc = '';
//                 newFearLevel = sohl.StressItemData.fearLevels.Afraid;
//             }
//         }

//         if (addInspiredAE) {
//             // Create a new AE to provide the +20 to all further Fear and Morale rolls for 10 minutes
//         }

//         if (!fearItem.id) {
//             fearItem.system.level = { base: newFearLevel };
//             const updateData = foundry.utils.flattenObject(fearItem);
//             fearItem = await Item.create(updateData, { parent: this });
//         } else if (newFearLevel !== oldFearLevel) {
//             await fearItem.update({ "system.level.base": newFearLevel });
//         }

//         const chatTemplate = 'systems/sohl/templates/chat/standard-test-card.html';

//         const html = await renderTemplate(chatTemplate, attrRollResult);

//         const messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.ROLL,
//             sound: CONFIG.sounds.dice,
//             roll: attrRollResult.roll.rollObj
//         };

//         const messageOptions = {
//             rollMode: game.settings.get("core", "rollMode")
//         };

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions)
//         attrRollResult.item = fearItem;
//         return attrRollResult;
//     }

//     /**
//      * Perform a morale test and display a chat card with the results of the test. If applicable, a new morale stress item will be created.
//      *
//      * @param {string} morale Stress item representing the morale
//      * @param {object} [options={}] Options which specify how to perform the test
//      * @param {boolean} [options.skipDialog=false] Do not present dialog, use default behavior
//      * @returns Object containing the results of the test
//      *
//      * @override
//      */
//     async moraleTest(moraleName, { skipDialog = false } = {}) {
//         let morale = this.getItem(moraleName, { types: [sohl.StressItemData.typeName] });

//         if (morale) {
//             if (morale.system.type !== 'Morale') {
//                 throw new Error(`sohl.SoHL | Stress item ${morale.name} is of type '${morale.system.type}', not Morale`);
//             }
//         } else {
//             let dlgHtml = `
//             <form>
//                 <div class="form-group">
//                     <label>Morale Sources:</label>
//                     <select name="source">
//                         <option value="New">New</option>`;
//             const moraleItems = this.items.filter(it => it.system instanceof sohl.StressItemData && it.system.type === 'Morale');
//             moraleItems.forEach(mi => {
//                 dlgHtml += `<option value="${mi.id}">${mi.name}</option>`;
//             });
//             dlgHtml += '</select></div></form>';
//             const dlgResult = await Dialog.prompt({
//                 title: 'Select Morale Source',
//                 content: dlgHtml.trim(),
//                 label: 'OK',
//                 callback: html => {
//                     const form = html[0].querySelector("form");
//                     return form.source.value;
//                 },
//                 rejectClose: false
//             });
//             if (!dlgResult) return null;
//             if (dlgResult !== 'New') {
//                 morale = this.getItem(dlgResult, sohl.StressItemData.typeName);
//             } else {
//                 const name = sohl.SohlActorSheet._createUniqueName('New Morale', this.itemTypes.stress);
//                 morale = {
//                     name: name,
//                     type: sohl.StressItemData.typeName,
//                     system: {
//                         type: 'Morale',
//                         level: {
//                             base: sohl.StressItemData.moraleLevels.Steady,
//                             mods: LgndUtility.setModBase(sohl.StressItemData.moraleLevels.Steady)
//                         },
//                         nextCheckTime: game.time.worldTime,
//                         createdTime: game.time.worldTime
//                     }
//                 };
//                 LgndUtility.applyMods(morale.system.level);
//             }
//         }

//         const oldMoraleLevel = morale.system.level.effective;
//         const moraleStates = Object.keys(sohl.StressItemData.moraleLevels);

//         const skillRollResult = await this.skillTest("Initiative", {
//             skipDialog,
//             label: 'Morale Test',
//             noChat: true
//         });
//         if (!skillRollResult) return null;

//         skillRollResult.title = 'Morale Test';
//         let newMoraleLevel = sohl.StressItemData.moraleLevels.Steady;
//         let addInspiredAE = false;
//         if (skillRollResult.isCritical) {
//             if (skillRollResult.isSuccess) {
//                 skillRollResult.resultText = moraleStates[sohl.StressItemData.fearLevels.Brave];
//                 skillRollResult.resultDesc = '';
//                 addInspiredAE = true;
//                 newMoraleLevel = sohl.StressItemData.moraleLevels.Brave;
//             } else {
//                 if (skillRollResult.lastDigit === 5) {
//                     skillRollResult.resultText = moraleStates[sohl.StressItemData.fearLevels.Terrified];
//                     skillRollResult.resultDesc = '';
//                     newMoraleLevel = sohl.StressItemData.moraleLevels.Routed;
//                 } else {
//                     skillRollResult.resultText = moraleStates[sohl.StressItemData.fearLevels.Catatonic];
//                     skillRollResult.resultDesc = '';
//                     newMoraleLevel = sohl.StressItemData.moraleLevels.Catatonic;
//                 }
//             }
//         } else {
//             if (skillRollResult.isSuccess) {
//                 skillRollResult.resultText = moraleStates[sohl.StressItemData.fearLevels.Steady];
//                 skillRollResult.resultDesc = '';
//                 newMoraleLevel = sohl.StressItemData.moraleLevels.Steady;
//             } else {
//                 skillRollResult.resultText = moraleStates[sohl.StressItemData.fearLevels.Afraid];
//                 skillRollResult.resultDesc = '';
//                 newMoraleLevel = sohl.StressItemData.moraleLevels.Withdrawing;
//             }
//         }

//         if (!morale.id) {
//             morale.system.level = { base: newMoraleLevel };
//             const updateData = foundry.utils.flattenObject(morale);
//             morale = await Item.create(updateData, { parent: this });
//         } else if (newMoraleLevel !== oldMoraleLevel) {
//             await morale.update({ "system.level.base": newMoraleLevel });
//         }

//         const chatTemplate = 'systems/sohl/templates/chat/standard-test-card.html';

//         const html = await renderTemplate(chatTemplate, skillRollResult);

//         const messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.ROLL,
//             sound: CONFIG.sounds.dice,
//             roll: skillRollResult.roll.rollObj
//         };

//         const messageOptions = {
//             rollMode: game.settings.get("core", "rollMode")
//         };

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions)

//         skillRollResult.item = morale;
//         return skillRollResult;
//     }

//     /**
//      * Perform a rally test and display a chat card with the results of the test.
//      *
//      * @param {object} [options={}] Options which specify how to perform the test
//      * @param {boolean} [options.skipDialog=false] Do not present dialog, use default behavior
//      * @returns Object containing the results of the test
//      *
//      * @override
//      */
//     async rallyTest({ skipDialog = false } = {}) {
//         const name = this.isToken ? this.token.name : this.name

//         const skillRollResult = await this.skillTest("Command", {
//             skipDialog,
//             label: 'Rally Test',
//             noChat: true
//         });
//         if (!skillRollResult) return null;

//         skillRollResult.title = skillRollResult.label;
//         if (skillRollResult.isCritical) {
//             if (skillRollResult.isSuccess) {
//                 skillRollResult.resultText = 'Steady';
//                 skillRollResult.resultDesc = 'Allies cease withdrawing';
//             } else {
//                 skillRollResult.resultText = 'Unresponsive';
//                 skillRollResult.resultDesc = 'Allies will not respond to any Rally Rolls for ten minutes (120 rounds)';
//             }
//         } else {
//             if (skillRollResult.isSuccess) {
//                 skillRollResult.resultText = 'Reaction Roll';
//                 skillRollResult.resultDesc = 'At start of their turn, allies make a Reaction Roll';
//             } else {
//                 skillRollResult.resultText = 'Unresponsive';
//                 skillRollResult.resultDesc = 'Allies will not respond to any Rally Rolls for one minute (12 rounds)';
//             }
//         }

//         const chatTemplate = 'systems/sohl/templates/chat/standard-test-card.html';

//         const html = await renderTemplate(chatTemplate, skillRollResult);

//         const messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.ROLL,
//             sound: CONFIG.sounds.dice,
//             roll: skillRollResult.roll.rollObj

//         };

//         const messageOptions = {
//             rollMode: game.settings.get("core", "rollMode")
//         };

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions)

//         return skillRollResult;
//     }

//     /**
//      * Perform a stumble test and display a chat card with the results of the test.
//      *
//      * @param {object} [options={}] Options which specify how to perform the test
//      * @param {boolean} [options.skipDialog=false] Do not present dialog, use default behavior
//      * @returns Object containing the results of the test
//      *
//      * @override
//      */
//     async stumbleTest({ skipDialog = false } = {}) {
//         let skillRollResult;
//         const acrobatics = this.items.find(it => it.system instanceof sohl.SkillItemData && it.name === 'Acrobatics');
//         const aglAttr = this.itemTypes.trait.find(trait => trait.name === 'Agility');

//         if (!acrobatics && !aglAttr) {
//             const msg = `${this.isToken ? this.token.name : this.name} does not have Acrobatics skill or Agility attribute, so cannot Stumble`;
//             ui.notifications.warn(msg);
//             console.warn(`sohl.SoHL | ${msg}`);
//             return null;
//         }

//         if (!aglAttr || acrobatics?.system.masteryLevel.effective > aglAttr.system.targetLevel.effective) {
//             skillRollResult = await this.skillTest(acrobatics.id, {
//                 skipDialog,
//                 label: 'Stumble (Acrobatics) Test'
//             });
//         } else {
//             skillRollResult = await this.attributeTest(aglAttr.id, {
//                 skipDialog,
//                 label: 'Stumble (Agility) Test'
//             });
//         }

//         return skillRollResult;
//     }

//     /**
//      * Perform a fumble test and display a chat card with the results of the test.
//      *
//      * @param {object} [options={}] Options which specify how to perform the test
//      * @param {boolean} [options.skipDialog=false] Do not present dialog, use default behavior
//      * @returns Object containing the results of the test
//      *
//      * @override
//      */
//     async fumbleTest({ skipDialog = false } = {}) {
//         const legerdemain = this.items.find(it => it.system instanceof sohl.SkillItemData && it.name === 'Legerdemain');
//         const dexAttr = this.itemTypes.trait.find(trait => trait.name === 'Dexterity');

//         if (!legerdemain && !dexAttr) {
//             const msg = `${this.isToken ? this.token.name : this.name} does not have Legerdemain skill or Dexterity attribute, so cannot Fumble`;
//             ui.notifications.warn(msg);
//             console.warn(`sohl.SoHL | ${msg}`);
//             return null;
//         }

//         let skillRollResult;
//         if (!dexAttr || legerdemain?.system.masteryLevel.effective > dexAttr.system.targetLevel.effective) {
//             skillRollResult = await this.skillTest(legerdemain.id, {
//                 skipDialog,
//                 label: 'Fumble (Legerdemain) Test'
//             });
//         } else {
//             skillRollResult = await this.attributeTest(dexAttr.id, {
//                 skipDialog,
//                 label: 'Fumble (Dexterity) Test'
//             });
//         }

//         return skillRollResult;
//     }

//     /**
//      * Modify the quantity of projectiles carried.
//      *
//      * @param {LgndItem} item Projectile to change quantity
//      * @param {string} newValue New quantity value.  If starts with + or -, then quantity change will
//      * be relative to current quantity, otherwise quantity will be set to the specified value
//      * @param {object} [options={}] Options which specify how to perform the test
//      *
//      * @override
//      */
//     async changeMissileQuanity(projectileName, newValue, options = {}) {
//         let item = this.getItem(projectileName, { types: [sohl.ProjectileGearItemData.typeName] });
//         if (!item) return null;

//         if (!this.actor.isOwner) {
//             ui.notifications.warn(`You are not an owner of ${this.actor.name}, so you may not change ${item.name} quantity.`);
//             return false;
//         }

//         const updateData = {};
//         if (/^\s*[+-]/.test(newValue)) {
//             // relative change
//             const changeValue = parseInt(newValue, 10);
//             if (!isNaN(changeValue)) updateData['system.quantity'] = Math.max(item.system.quantity + changeValue, 0);
//         } else {
//             const value = parseInt(newValue, 10);
//             if (!isNaN(value)) updateData['system.quantity'] = value;
//         }

//         if (typeof updateData['system.quantity'] !== 'undefined') {
//             await item.update(updateData);
//         }
//         return true;
//     }

//     /*--------------------------------------------------------------*/
//     /*        OPPOSED ROLLS                                         */
//     /*--------------------------------------------------------------*/

//     /**
//      * Perform an opposed test for the given skill, attribute, spell, or arcane talent against the current targeted token.
//      *
//      * @param {LgndItem} item Skill, attribute, spell, or arcane talent to oppose
//      * @param {object} [options={}] Options which specify how to perform the test
//      *
//      * @override
//      */
//     async opposedTest(skillName, options = {}) {
//         let item = this.getItem(skillName, { types: [sohl.SkillItemData.typeName, sohl.TraitItemData.typeName, sohl.MysticalAbilityItemData.typeName] });

//         //const targetToken = this.#getTargetedToken();
//         //if (!targetToken) return null;

//         const targetLevel = item.system.masteryLevel || item.system.targetLevel;
//         if (!targetLevel) {
//             const msg = `${item.name} does not support opposed rolls.`;
//             ui.notifications.warn(msg);
//             console.warn(`sohl.SoHL | ${msg}`);
//             return null;
//         }

//         if (this && this.system.shock === LGND.CONST.SHOCK.Stunned) targetLevel.successLevelMod--;

//         const dialogOptions = foundry.utils.mergeObject({
//             type: `opposed-${item.type}-roll`,
//             label: `Opposed ${item.name} Test Request`,
//             showSuccessLevel: true,
//         }, targetLevel);

//         // Get roll info
//         const rollData = await LgndDice.d100StdDialog(dialogOptions);

//         // If user cancelled the roll, then return immediately
//         if (!rollData) return null;

//         // Prepare for Chat Message
//         const chatTemplate = 'systems/sohl/templates/chat/standard-test-card.html';

//         const chatTemplateData = {
//             isOpposedTest: true,
//             title: dialogOptions.label,
//             attacker: this.name,
//             atkActorUuid: this.uuid,
//             mods: rollData.mods,
//             atkRollData: JSON.stringify(rollData),
//             effTarget: rollData.target,
//             successLevelMod: rollData.successLevelMod,
//             itemUuid: item.uuid,
//             itemName: item.name,
//             itemType: item.type
//         };

//         const html = await renderTemplate(chatTemplate, chatTemplateData);

//         const messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.OTHER
//         };

//         // Create a chat message
//         await ChatMessage.create(messageData)

//         chatTemplateData.item = item;
//         return chatTemplateData;
//     }

//     /*--------------------------------------------------------------*/
//     /*        AUTOMATED COMBAT                                      */
//     /*--------------------------------------------------------------*/

//     /**
//      * Displays a dialog asking user to choose a weapon.
//      *
//      * @param {Token} atkToken
//      * @param {number} distanceToTarget
//      * @param {object} options
//      * @param {string} [options.type] Type of weapon: 'weapon', 'missile', CombatTechniqueItemData.typeName
//      * @param {string} [options.weaponUuid=null] Weapon ID to use (bypass dialog)
//      * @returns {object} Selected weapon
//      */
//     static async _selectWeaponDialog(atkToken, distanceToTarget, { types = ['weapon', 'missile', sohl.CombatTechniqueItemData.typeName], weaponId = null } = {}) {
//         let result = null;
//         if (weaponId) {
//             const item = atkToken.actor.getItem(weaponId, { types });
//             if (!item) {
//                 ui.notifications.warn(`${atkToken.name} does not have a weapon with ID ${weaponId}`);
//                 return null;
//             }

//             const insideEZ = this.insideEngagementZone(item, distanceToTarget)
//             if (!insideEZ) {
//                 ui.notifications.warn(`${atkToken.name}'s ${item.name} cannot reach target, distance=${distanceToTarget}ft.`);
//                 return null;
//             }

//             result = item;
//         } else {
//             const atkWpns = this.#getWeapons(atkToken, distanceToTarget, { types });

//             if (!atkWpns.weapons.length) {
//                 ui.notifications.warn(`${atkToken.name} does not have any usable weapons of type ${types.map(t => LgndItem.typeLabels[t].singular).join(' or ')}.`);
//                 return null;
//             }

//             const queryWeaponDialog = "systems/sohl/templates/dialog/query-weapon-dialog.html";

//             const dlgHtml = await renderTemplate(queryWeaponDialog, {
//                 weapons: atkWpns.weapons,
//                 weaponUuid: atkWpns.defaultWeapon || atkWpns.weapons[0],
//                 prompt: 'Please select your weapon'
//             });

//             // Request weapon name
//             const weaponUuid = await Dialog.prompt({
//                 title: 'Select Weapon',
//                 content: dlgHtml.trim(),
//                 label: "OK",
//                 callback: html => {
//                     const form = html[0].querySelector("form");
//                     const formWeaponUuid = form.weaponUuid.value;
//                     return formWeaponUuid;
//                 },
//                 rejectClose: false
//             });

//             result = atkToken.actor.getItem(weaponUuid);
//         }

//         return result;
//     }

//     /**
//      * Returns an array of either 1 or two numbers, representing the minimum zone die and the next higher
//      * zone die that is less than the maximum number of specified zones.  Normally should return two
//      * numbers, but in the case where the next higher zone number is greater than the maxZones, there
//      * will only be one number.
//      */
//     static #zoneDieChoices(minZoneDie, maxZones) {
//         const result = [];
//         for (let zd in sohl.BodyZoneData.dice) {
//             if (zd < minZoneDie) continue;
//             if (zd > maxZones) continue;
//             result.push(zd);
//             if (result.length === 2) break;
//         }
//         if (!result.length) result.push(minZoneDie);
//         return result;
//     }

//     /**
//      * @typedef {object} AttackProperties
//      * @property {number} zoneOffset
//      * @property {number} zoneDie
//      * @property {number} successLevelMod
//      * @property {boolean} isStillTarget
//      * @property {ModObject} attack
//      * @property {ModObject} impact
//      */

//     /**
//      * Queries for the ZD, Aim Zone, and situational modifiers.
//      *
//      * @param {object} options        Additional options for the attack
//      * @param {Token} [options.attackToken]  Token representing attacker
//      * @param {Token} [options.defendToken]  Token representing defender
//      * @param {object} [options.weapon] The weapon to be used in the attack
//      * @param {string} [options.type] One of 'Attack' or 'Counterstrike'
//      * @param {number} [options.distance] Distance to the target
//      *
//      * @returns {Object<AttackProperties>} Attack properties on success, null if abandoned.
//      */

//     static async _attackDialog({ attackToken, defendToken, weaponItem, type = 'Attack', distance = 0 } = {}) {
//         if (!attackToken || !defendToken) return null;

//         const dialogOptions = {
//             title: `${attackToken.name} vs. ${defendToken.name} ${type} with ${weaponItem.name}`,
//             distance: distance,
//             zoneOffset: 0,
//             weapon: weaponItem.name,
//             zoneDieChoices: this.#zoneDieChoices(weaponItem.zoneDie, attackToken.actor.system.maxZones),
//             impactLabel: weaponItem.impact.label,
//             attackMods: weaponItem.attack.mods || [],
//             attackModifier: 0,
//             impactMods: weaponItem.impact.mods || [],
//             impactModifier: 0,
//             successLevelMod: weaponItem.attack.successLevelMod || 0,
//             isMissile: weaponItem.type === 'missile',
//             attackerMoving: false
//         };

//         const attackDialogTemplate = "systems/sohl/templates/dialog/attack-dialog.html";
//         const dlgHtml = await renderTemplate(attackDialogTemplate, dialogOptions);

//         // Request weapon details
//         return await Dialog.prompt({
//             title: dialogOptions.title,
//             content: dlgHtml.trim(),
//             label: type,
//             callback: html => {
//                 const form = html[0].querySelector("form");
//                 const formZoneOffset = Number.parseInt(form.zoneOffset.value, 10) || 0;
//                 const formZoneDie = Number.parseInt(form.zoneDie.value, 10) || weaponItem.zoneDie;
//                 const formAttackModifier = Number.parseInt(form.attackModifier.value, 10) || 0;
//                 const formLgndImpactModifier = Number.parseInt(form.impactModifier.value, 10) || 0;
//                 const formSuccessLevelMod = Number.parseInt(form.successLevelMod.value, 10) || 0;

//                 const result = {
//                     zoneDieFormula: LgndInjuryRuleset.calcZoneDieFormula(formZoneDie, formZoneOffset),
//                     successLevelMod: formSuccessLevelMod,
//                     isStillTarget: false,
//                     attack: foundry.utils.deepClone(type === 'Counterstrike' ? weaponItem.defense.counterstrike : weaponItem.attack),
//                     impact: foundry.utils.deepClone(weaponItem.impact)
//                 };

//                 if (formAttackModifier) {
//                     result.attack.add("Player Modifier", "PlyrMod", formAttackModifier);
//                 }

//                 if (formLgndImpactModifier) {
//                     result.impact.add("Player Modifier", "PlyrMod", formLgndImpactModifier);
//                 }

//                 if (dialogOptions.isMissle) {
//                     switch (form.targetMovement.value) {
//                         case 'still':
//                             result.isStillTarget = true;
//                             break;

//                         case 'moving':
//                             result.attack.add(`${defToken.name} Moving`, 'TgtMove', -10);
//                             break;

//                         case 'evading':
//                             const siPenalty = (defToken.actor.getCombatStat('Dodge').getProperty('index') * 4) || 0;
//                             const penalty = Math.min(siPenalty, -10);
//                             result.attack.add(`${defToken.name} Evading`, 'TgtEvade', penalty);
//                             break;
//                     }

//                     if (weaponItem.assocSkill !== 'Throwing' && form.attackerMoving?.value) {
//                         result.attack.add(`${atkToken.name} Moving`, 'AtkMove', -10);
//                     }
//                 }

//                 LgndUtility.applyMods(result.attack);
//                 LgndUtility.applyMods(result.impact);

//                 return result;
//             },
//             rejectClose: false
//         });
//     }

//     /**
//      * Determine default weapon for a particualr actor based on maximum impact.
//      *
//      * @param {Token} token Attacking token with weapons
//      * @returns An object containing a list of weapons and the default weapon id
//      */
//     static #getWeapons(token, distanceToTarget, { types = ['weapon', 'missile', CombatTechniqueItemData.typeName], ignoreRange = false }) {
//         let result = { weapons: [], defaultWeapon: null, maxImpact: Number.MIN_SAFE_INTEGER };
//         if (!this._isLivingToken(token)) return result;

//         // Note that container actors cannot have missiles or weapons equipped, so just immediately return
//         if (token.actor.type === 'container') return result;

//         // Find all usable melee weapon strike modes
//         if (types.includes('weapon')) {
//             result = token.actor.system.weapons.reduce((list, w) => {
//                 if (!w.traits.noAttack) {
//                     const inEngZone = ignoreRange || this.insideEngagementZone(w, distanceToTarget);
//                     if (inEngZone) {
//                         list.weapons.push({ uuid: w.uuid, name: `Weapon: ${w.name}`, obj: w });
//                         const maxImpact = w.impact.die + w.impact.effective;
//                         if (maxImpact > list.maxImpact) {
//                             list.defaultWeapon = w.uuid;
//                             list.maxImpact = maxImpact;
//                         }
//                     }
//                 }
//                 return list;
//             }, result);
//         }

//         // Find all usable combat techniques
//         if (types.includes(CombatTechniqueItemData.typeName)) {
//             result = token.actor.itemTypes.combattechnique.reduce((list, ct) => {
//                 if (!ct.system.traits.noAttack) {
//                     const inEngZone = ignoreRange || this.insideEngagementZone(ct, distanceToTarget);
//                     if (inEngZone) {
//                         list.weapons.push({ uuid: ct.uuid, name: `Combat Technique: ${ct.name}`, obj: ct });
//                         const maxImpact = ct.system.impact.die + ct.system.impact.effective;
//                         if (maxImpact > list.maxImpact) {
//                             list.defaultWeapon = ct.uuid;
//                             list.maxImpact = maxImpact;
//                         }
//                     }
//                 }
//                 return list;
//             }, result);
//         }

//         // Find all usable missile weapons
//         if (types.includes('missile')) {
//             const usableMissiles = token.actor.system.missiles.reduce((coll, m) => {
//                 let missileWeapon = coll.get(m.weaponId) || m;

//                 if ((ignoreRange || (distanceToTarget <= missileWeapon.distance))) {
//                     coll.set(m.weaponId, m.distance < missileWeapon.distance ? m : missileWeapon);
//                 }
//                 return coll;
//             }, new Collection());
//             result.weapons = result.weapons.concat(usableMissiles.contents);
//         }

//         return result;
//     }

//     #getTargetedToken() {
//         const targets = game.user.targets;
//         if (!targets?.size) {
//             ui.notifications.warn(`No targets selected, you must select exactly one target, action aborted.`);
//             return null;
//         } else if (targets.size > 1) {
//             ui.notifications.warn(`${targets} targets selected, you must select exactly one target, action aborted.`);
//             return null;
//         }

//         const targetToken = Array.from(targets)[0];

//         if (targetToken.id === this.token?.id) {
//             ui.notifications.warn(`Source and target are identical, action aborted.`);
//             return null;
//         }

//         return targetToken;
//     }

//     async #checkWeaponBreak(atkToken, atkWeapon, defToken, defWeapon) {
//         if (!atkWeapon || !atkToken) {
//             console.error(`sohl.SoHL | Attack weapon was not specified`);
//             return { attackWeaponBroke: false, defendWeaponBroke: false };
//         }

//         if (!defWeapon || !defToken) {
//             console.error(`sohl.SoHL | Defend weapon was not specified`);
//             return { attackWeaponBroke: false, defendWeaponBroke: false };
//         }

//         // Weapon Break Check
//         let atkWeaponBroke = false;
//         let defWeaponBroke = false;

//         const atkWeaponQuality = atkWeapon.system.quality;
//         const defWeaponQuality = defWeapon.system.quality;

//         const atkBreakRoll = await new Roll('3d6').evaluate({ async: true });
//         const defBreakRoll = await new Roll('3d6').evaluate({ async: true });

//         if (atkWeaponQuality <= defWeaponQuality) {
//             // Check attacker first, then defender
//             atkWeaponBroke = atkBreakRoll.total > atkWeaponQuality;
//             defWeaponBroke = !atkWeaponBroke && defBreakRoll.total > defWeaponQuality;
//         } else {
//             // Check defender first, then attacker
//             defWeaponBroke = defBreakRoll.total > defWeaponQuality;
//             atkWeaponBroke = !defWeaponBroke && atkBreakRoll.total > atkWeaponQuality;
//         }

//         const chatData = {};

//         const messageData = {
//             user: game.user.id,
//             style: CONST.CHAT_MESSAGE_STYLES.ROLL,
//             sound: CONFIG.sounds.dice
//         };

//         const chatTemplate = "systems/sohl/templates/chat/weapon-break-card.html";

//         // Prepare and generate Attack Weapon Break chat message

//         chatData.tokenName = atkToken.name;
//         chatData.weaponName = atkWeapon.name;
//         chatData.quality = atkWeapon.system.quality;
//         chatData.weaponBroke = atkWeaponBroke;
//         chatData.rollValue = atkBreakRoll.total;
//         chatData.actorId = atkWeapon.parentId;
//         chatData.title = "Attack Weapon Break Check";

//         let html = await renderTemplate(chatTemplate, chatData);

//         messageData.content = html.trim();
//         messageData.speaker = ChatMessage.getSpeaker({ token: defToken });
//         messageData.roll = atkBreakRoll;

//         const messageOptions = {};

//         await ChatMessage.create(messageData, messageOptions)

//         // Prepare and generate Defend Weapon Break chat message

//         chatData.tokenName = defToken.name;
//         chatData.weaponName = defWeapon.name;
//         chatData.quality = defWeapon.system.quality;
//         chatData.weaponBroke = defWeaponBroke;
//         chatData.rollValue = defBreakRoll.total;
//         chatData.actorId = defWeapon.parentId;
//         chatData.title = "Defend Weapon Break Check";

//         html = await renderTemplate(chatTemplate, chatData);

//         messageData.content = html.trim();
//         messageData.speaker = ChatMessage.getSpeaker({ token: defToken });
//         messageData.roll = defBreakRoll;

//         await ChatMessage.create(messageData, messageOptions);

//         return { attackWeaponBroke: atkWeaponBroke, defendWeaponBroke: defWeaponBroke };
//     }

//     static async _getTacticalAdvantages(validTAs, numTAs, wpn, taChoice) {
//         if (!numTAs) return taChoice;

//         const dlgHtml = `
//         <form>`;
//         for (let i = 1; i <= numTAs; i++) {
//             dlgHtml += `<div class="form-group">
//                 <label>Tactical Advantage ${i}:</label>
//                 <select name="ta${i}">`;
//             validTAs.forEach(ta => {
//                 dlgHtml += `<option value="${ta}">${ta}</option>`;
//             });
//             dlgHtml += '</select></div>';
//         }
//         dlgHtml += '</form>';
//         let newTAChoice = await Dialog.prompt({
//             title: "Choose Target",
//             content: dlgHtml.trim(),
//             label: "OK",
//             callback: async (html) => {
//                 const form = html[0].querySelector("form");
//                 for (let i = 1; i <= numTAs; i++) {
//                     taType = form[`ta${i}`].value;
//                     taChoice[taType]++;
//                 }
//                 return taChoice;
//             },
//             rejectClose: false
//         });
//         if (!newTAChoice) {
//             taChoice["Precision"] += numTAs;
//         } else {
//             taChoice = newTAChoice;
//         }

//         return taChoice;
//     }

//     /**
//      * Display the results of meele
//      *
//      * @param {Integer} atkRoll The attack roll
//      * @param {Integer} defRoll The defense roll
//      * @param {String} defenseType The type of defense: "ignore", "block", "counterstrike", or "dodge"
//      */
//     static _meleeCombatResult(atkRoll, defRoll, defenseType) {
//         let result = { desc: 'Inconclusive.', defTA: 0, atkTA: 0, defSuccess: false, atkSuccess: false, defBlock: false, victoryStars: 0 };
//         result.victoryStars = this.calcVictoryStars(atkRoll.successLevel, defRoll?.successLevel);

//         if (defenseType === 'block') {
//             if (result.victoryStars === null) return result;
//             if (result.victoryStars === 0) {
//                 // Break ties: defender wins
//                 result.victoryStars--;
//             }
//             if (result.victoryStars > 0) return this.#meleeAttackSuccess(result.victoryStars, atkRoll, defRoll);
//             if (result.victoryStars < 0) {
//                 result.desc = 'Defender blocks.';
//                 result.defSuccess = true;
//                 result.defBlock = true;
//             }
//             result.defTA = result.victoryStars < -1 ? (-result.victoryStars) - 1 : 0;
//         } else if (defenseType === 'dodge') {
//             if (result.victoryStars === null) return result;
//             if (result.victoryStars === 0) {
//                 // Break ties: higher roll wins
//                 if (atkRoll.rollObj.total > defRoll.rollObj.total) {
//                     result.victoryStars++;
//                 } else if (atkRoll.rollObj.total < defRoll.rollObj.total) {
//                     result.victoryStars--;
//                 } else if (atkRoll.target > defRoll.rollObj.target) {
//                     result.victoryStars++;
//                 } else {
//                     result.victoryStars--;
//                 }
//             }
//             if (result.victoryStars > 0) return this.#meleeAttackSuccess(result.victoryStars, atkRoll, defRoll);
//             if (result.victoryStars < 0) {
//                 result.desc = 'Defender dodged.';
//                 result.defSuccess = true;
//             }
//             result.defTA = result.victoryStars < -1 ? (-result.victoryStars) - 1 : 0;
//         } else if (defenseType === 'ignore') {
//             if (atkRoll.successLevel <= sohl.SOHL.CONST.SUCCESS_LEVEL.CriticalFailure) {
//                 result.desc = 'Attacker missed.';
//                 return result;
//             }
//             if (atkRoll.successLevel === sohl.SOHL.CONST.SUCCESS_LEVEL.MarginalFailure) {
//                 result.desc = "Attacker hit.";
//                 result.victoryStars = 1;
//                 result.atkSuccess = true;
//             } else if (atkRoll.successLevel >= sohl.SOHL.CONST.SUCCESS_LEVEL.MarginalSuccess) {
//                 result.desc = "Attacker hit.";
//                 result.victoryStars = atkRoll.successLevel + 2;
//                 result.atkSuccess = true;
//             }
//             result.atkTA = atkRoll.successLevel >= sohl.SOHL.CONST.SUCCESS_LEVEL.MarginalSuccess ? atkRoll.successLevel + 1 : 0;
//         } else if (defenseType === 'counterstrike') {
//             if (result.victoryStars === null) return result;
//             if (result.victoryStars === 0) {
//                 // Resolve ties in favor of the attacker
//                 result.victoryStars++;
//             }
//             if (result.victoryStars > 0) return this.#meleeAttackSuccess(result.victoryStars);
//             if (result.victoryStars < 0) {
//                 result.desc = "Counterstrike hit.";
//                 result.defSuccess = true;
//             }
//             result.defTA = result.victoryStars < -1 ? (-result.victoryStars) - 1 : 0;
//         }

//         return result;
//     }

//     static #meleeAttackSuccess(victoryStars) {
//         if (victoryStars === null) return null;
//         const result = { desc: 'Attacker hit.', defTA: 0, atkTA: 0, defSuccess: false, atkSuccess: true, defBlock: false, victoryStars: victoryStars };
//         result.atkTA = victoryStars > 1 ? victoryStars - 1 : 0;
//         return result;
//     }

//     /**
//      * Initiate an automated attack against the current targeted token.
//      *
//      * @param {object} [options={}] Options which specify how to perform the test
//      * @param {string} [options.weaponId=null] ID or name of melee weapon to use, or ask if null
//      * @param {boolean} [options.forceAllow=false] Force allowing melee attack even if out of range
//      * @param {boolean} [options.isTA=false] Flag indicating whether this is a result of a Tactical Advantage
//      *
//      * @override
//      */
//     async automatedAttack({ weaponId = null, forceAllow = false, isTA = false } = {}) {
//         if (!game.combat) {
//             ui.notifications.warn(`No combat occuring; start combat before attacking`);
//             return null;
//         }

//         const actorTokens = this.getActiveTokens();
//         let atkToken = null;
//         if (actorTokens.length <= 0) {
//             ui.notifications.warn(`There is no token for the actor ${this.name} in the active scene, cannot perform automated combat`);
//             return null;
//         } else if (actorTokens.length > 1) {
//             ui.notifications.warn(`There are multiple tokens for the actor ${this.name} in the active scene, please trigger actions from token's character sheet.`)
//             return null;
//         } else {
//             atkToken = actorTokens[0];
//         }

//         if (atkToken.actor.type === 'container') {
//             const msg = `sohl.SoHL | Attacker ${this.token.name} is invalid (it is a container).`;
//             ui.notifications.warn(msg);
//             throw new Error(msg);
//         }

//         let defToken = this.#getTargetedToken();
//         if (!defToken && !canvas.templates.placeables.length) {
//             ui.notifications.warn(`No defender token or template identified.`);
//             return null;
//         }

//         if (defToken && defToken.actor.type === 'container') {
//             const msg = `sohl.SoHL | Defender ${defToken.name} is invalid (it is a container).`;
//             ui.notifications.warn(msg);
//             throw new Error(msg);
//         }

//         let targetDistance = 0;
//         if (defToken) {
//             targetDistance = sohl.Utility.rangeToTarget(atkToken, defToken, false);
//         } else {
//             targetDistance = sohl.Utility.rangeToTarget(atkToken, canvas.templates.placeables[0], false)
//         }

//         const wpn = await LgndCharacterCreatureActorRuleset._selectWeaponDialog(atkToken, targetDistance, { weaponId, volleyOnly: !defToken });
//         if (!wpn) return null;

//         let volleyTarget = null;
//         const isVolley = wpn.type === 'missile' && ['V2', 'V3', 'V4'].includes(wpn.range);
//         if (isVolley) {
//             if (!canvas.templates.placeables.length) {
//                 ui.notifications.warn(`Volley missile attacks require you to place a single measured template on the scene where the missile is being aimed`);
//                 return null;
//             } else if (canvas.templates.placeables.length > 1) {
//                 ui.notifications.warn(`Multiple templates are defined, please only define a single template for volley missile attacks`);
//             }
//             volleyTarget = canvas.templates.placeables[0];
//         }

//         const dialogResult = await LgndCharacterCreatureActorRuleset._attackDialog({
//             distance: targetDistance,
//             type: 'Attack',
//             attackToken: atkToken,
//             defendToken: defToken,
//             weaponItem: foundry.utils.deepClone(wpn)
//         });

//         // If user cancelled the dialog, then return immediately
//         if (!dialogResult) return null;

//         let bodyLocation = 'Random';

//         if (wpn.type === 'missile') {
//             const missile = atkToken.actor.getItem(wpn.weaponId);
//             const projectile = options.weapon.projectileId ? atkToken.actor.getItem(options.weapon.weaponId) : null;

//             // If missile is thrown, mark as uncarried and release from body part
//             if (!projectile) {
//                 const updateData = [{ '_id': missile.id, 'system.isCarried': false }];
//                 const bpItem = this.items.find(it => type === "bodypart" && it.system.heldItem === wpn.weaponId);
//                 if (bpItem) {
//                     updateData.push({ '_id': bpItem.id, 'system.heldItem': '' });
//                 }
//                 this.updateEmbeddedDocuments("Item", updateData);
//             }

//             // If Missile Quantity Tracking option is enabled, reduce missile quantity by 1
//             // If projectiles are in use, those will be reduced, otherwise the missile itself
//             if (projectile && game.settings.get("sohl", sohl.SOHL.CONST.SETTINGS.optionProjectileTracking.key)) {
//                 await projectile.update({ 'system.quantity': mitem.system.quantity - 1 });
//             }

//             // Here we go.  Missiles don't allow the target to defend itself from the missile, so
//             // we're going to go ahead and handle the attack here directly.  This is unlike melee
//             // combat, since there you have a defender actually choosing a particular defense.
//             const roll = await LgndDice.rollTest({
//                 diceSides: 100,
//                 diceNum: 1,
//                 successLevelMod: dialogResult.attack.successLevelMod,
//                 target: dialogResult.attack.effective,
//                 type: 'missle'
//             });

//             let isStumble = false;
//             let isFumble = false;
//             let isStrike = false;
//             let hitAlternate = null;
//             let weaponDamage = 0;
//             let taChoice = {
//                 "Impact": 0,
//                 "Precision": 0
//             };
//             const victoryStars = this.calcVictoryStars(roll.successLevel);
//             let numTAs = isTA ? 0 : Math.max(combatResult.victoryStars - 1, 0);
//             const victoryStarsText = this.victoryStarsText(victoryStars);
//             const tacticalAdvantageList = [LGND.CONST.TACADV.PRECISION, LGND.CONST.TACADV.IMPACT];
//             if (isVolley) {

//                 if (roll.successLevel <= sohl.SOHL.CONST.SUCCESS_LEVEL.CriticalFailure) {
//                     // Mishap
//                     isStrike = false;
//                     if (roll.isCritical && roll.lastDigit === 0) {
//                         // CF0 - Fumble
//                         isFumble = true;
//                     } else {
//                         // CF5 - Stumble or Weapon Damage
//                         if (projectile) {
//                             // Bow/Sling/Crossbow Weapon Damage - d10+5
//                             weaponDamage += (Math.floor(MersenneTwister.random() * 10) + 5)
//                         } else {
//                             // Thrown weapon Stumble
//                             isStumble = true;
//                         }
//                     }
//                 } else {
//                     // Other than a critical failure, all other results have a chance
//                     // to hit something during a volley attack.

//                     const targetDie = wpn.range === 'V2' ? 12 : 20;
//                     let center = volleyTarget.center;
//                     center = canvas.grid.grid.getCenter(center.x, center.y);
//                     const centerGrid = canvas.grid.grid.getGridPositionFromPixels(center.x, center.y);
//                     let neighborGrids = 0;
//                     if (canvas.grid.type === CONST.GRID_TYPES.SQUARE) neighborGrids = 8;
//                     else if (canvas.grid.type === CONST.GRID_TYPES.GRIDLESS) neighborGrids = 8;
//                     else if (canvas.grid.type === CONST.GRID_TYPES.HEXODDR) neighborGrids = 6;
//                     else if (canvas.grid.type === CONST.GRID_TYPES.HEXEVENR) neighborGrids = 6;
//                     else if (canvas.grid.type === CONST.GRID_TYPES.HEXODDQ) neighborGrids = 6;
//                     else if (canvas.grid.type === CONST.GRID_TYPES.HEXEVENQ) neighborGrids = 6;

//                     const volleyGridUseNeighbors = Math.floor(15 / canvas.scene.grid.units) > 0
//                     const newCenterDistance = Math.ceil(15 / canvas.scene.grid.units);

//                     if (roll.successLevel === sohl.SOHL.CONST.SUCCESS_LEVEL.MarginalFailure) {
//                         // Calculate Deviation
//                         const newCenterDistance = Math.ceil(15 / canvas.scene.grid.units);
//                         const direction = Math.floor(MersenneTwister.random() * neighborGrids);
//                         if (canvas.grid.type !== CONST.GRID_TYPES.GRIDLESS) {
//                             for (let i = 0; i < newCenterDistance; i++) {
//                                 const neighbors = canvas.grid.grid.getNeighbors(centerGrid.x, centerGrid.y);
//                                 centerGrid = neighbors[direction];
//                             }
//                         } else {
//                             const neighborPatterns = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
//                             const nPat = neighborPatterns[direction];
//                             centerGrid.x = centerGrid.x + (nPat[0] * newCenterDistance);
//                             centerGrid.y = centerGrid.y + (nPat[1] * newCenterDistance);
//                         }
//                     }

//                     // We handle Precision TAs directly, so we never present Precision TAs to the player
//                     let numRolls = 0;
//                     if (roll.successLevel >= sohl.SOHL.CONST.SUCCESS_LEVEL.MarginalFailure) {
//                         numRolls = 1
//                     }
//                     if (roll.successLevel > sohl.SOHL.CONST.SUCCESS_LEVEL.MarginalSuccess) {
//                         numRolls += Math.max(roll.successLevel - sohl.SOHL.CONST.SUCCESS_LEVEL.MarginalSuccess, 0) * 2
//                     }

//                     if (numRolls) {
//                         let potentialTargets = [];
//                         if (canvas.grid.type !== CONST.GRID_TYPES.GRIDLESS) {
//                             let volleyGridArea = [centerGrid];
//                             if (volleyGridUseNeighbors) {
//                                 volleyGridArea = volleyGridArea.concat(canvas.grid.grid.getNeighbors(centerGrid.x, centerGrid.y));
//                             }

//                             // Find all tokens inside volley grid area
//                             potentialTargets = canvas.tokens.placeables.reduce((ary, t) => {
//                                 const tokenCenterGrid = canvas.grid.grid.getGridPositionFromPixels(t.x, t.y);
//                                 if (volleyGridArea.some(vga => vga[0] === tokenCenterGrid[0] && vga[1] === tokenCenterGrid[1])) {
//                                     return ary.push({ name: t.name, uuid: t.uuid });
//                                 }
//                                 return ary;
//                             }, []);
//                         } else {
//                             // Find all tokens inside volley area
//                             const volleyAreaRadius = canvas.grid.size * Math.ceil(7.5 / canvas.scene.grid.units);
//                             potentialTargets = canvas.tokens.placeables.reduce((ary, t) => {
//                                 const dist = canvas.grid.measureDistance({ x: centerGrid.x, y: centerGrid.y }, { x: t.x, y: t.y });
//                                 if (dist < volleyAreaRadius) {
//                                     return ary.push({ name: t.name, uuid: t.uuid });
//                                 }
//                                 return ary;
//                             }, []);
//                         }

//                         const targets = [];
//                         for (let i = 0; i < numRolls; i++) {
//                             const newTarget = Math.floor(MersenneTwister.random() * targetDie);
//                             if (newTarget < potentialTargets.length && !targets.includes(potentialTargets[newTarget])) {
//                                 targets.push(potentialTargets[newTarget]);
//                             }
//                         }

//                         let targetTokenUuid = null;

//                         if (targets.length === 1) {
//                             targetTokenUuid = targets[0];
//                         } else if (targets.length > 1) {
//                             const dlgHtml = `
//                             <form>
//                             <div class="form-group">
//                                 <label>Targets:</label>
//                                 <select name="target">`;
//                             targets.forEach(t => {
//                                 dlgHtml += `<option value="${t.uuid}">${t.name}</option>`;
//                             });
//                             dlgHtml += '</select></div></form>';
//                             targetTokenUuid = await Dialog.prompt({
//                                 title: "Choose Target",
//                                 content: dlgHtml.trim(),
//                                 label: "OK",
//                                 callback: async html => {
//                                     const form = html[0].querySelector("form");
//                                     return form.target.value;
//                                 },
//                                 rejectClose: false
//                             });
//                             if (!targetTokenUuid) targetTokenUuid = targets[0].uuid;
//                             defToken = fromUuidSync(targetTokenUuid);
//                             isStrike = true;
//                         }
//                         if (targetTokenUuid) {
//                             defToken = fromUuidSync(targetTokenUuid);
//                             isStrike = true;
//                         }
//                     }
//                 }
//             } else {
//                 if (roll.successLevel <= sohl.SOHL.CONST.SUCCESS_LEVEL.CriticalFailure) {
//                     // Mishap
//                     isStrike = false;
//                     if (roll.isCritical && roll.lastDigit === 0) {
//                         // CF0 - Fumble
//                         isFumble = true;
//                     } else {
//                         // CF5 - Stumble or Weapon Damage
//                         if (projectile) {
//                             // Bow/Sling/Crossbow Weapon Damage - d10+5
//                             weaponDamage += (Math.floor(MersenneTwister.random() * 10) + 5)
//                         } else {
//                             // Thrown weapon Stumble
//                             isStumble = true;
//                         }
//                     }
//                 } else if (roll.successLevel === sohl.SOHL.CONST.SUCCESS_LEVEL.MarginalFailure) {
//                     // Miss
//                     isStrike = false;
//                 } else if (roll.successLevel === sohl.SOHL.CONST.SUCCESS_LEVEL.MarginalSuccess) {
//                     // Success
//                     isStrike = true;
//                     if (dialogResult.isStillTarget) taChoice["Precision"]++;  // Addl Precision TA
//                 } else {
//                     // Success + n Tactical Advantages
//                     isStrike = true;
//                     if (dialogResult.isStillTarget) taChoice["Precision"]++; // Addl Precision TA
//                     numTAs = roll.successLevel - sohl.SOHL.CONST.SUCCESS_LEVEL.MarginalSuccess;
//                 }
//             }

//             let resultDesc = isStrike ? `Missile Hit` : `Missile Missed`;
//             if (!isStrike) {
//                 // Missile has missed target, but might hit an unintended victim within 7' of
//                 // the target.
//                 const targets = []
//                 canvas.tokens.placeables.forEach(t => {
//                     if (t.id !== atkToken.id) {
//                         const distance = sohl.Utility.rangeToTarget(atkToken, t, false);
//                         if (distance <= 7) {
//                             targets.push(t);
//                         }
//                     }
//                 });
//                 const roll = Roll.create('1d20').roll();
//                 if (roll.total <= targets.length) {
//                     hitAlternate = targets.at(roll.total - 1);
//                     resultDesc += ` but there ${targets.length > 1 ? 'are ' + targets.length + ' targets' : 'is 1 target'} nearby, and hit unintended target ${hitAlternate.name}!`;
//                 }
//             }

//             taChoice = await LgndCharacterCreatureActorRuleset._getTacticalAdvantages(Object.keys(taChoice), numTAs, wpn, taChoice);

//             if (taChoice['Impact']) {
//                 const impactAdd = (wpn.traits.impactTA || LGND.CONST.IMPACTTA[dialogResult.impact.aspect]) * taChoice['Impact'];
//                 dialogResult.impact.add(`${taChoice['Impact']} Impact TAs`, "ImpTA", impactAdd);
//                 taChoice['Impact'] = 0;
//             }
//             LgndUtility.applyMods(dialogResult.impact);

//             // Prepare for Chat Message
//             const chatTemplate = 'systems/sohl/templates/chat/attack-result-card.html';

//             const chatTemplateData = {
//                 title: `${missileItem.name} Attack Result`,
//                 attacker: atkToken.name,
//                 atkTokenUuid: atkToken.uuid,
//                 defender: defToken?.name || 'Nobody (Missed)',
//                 defTokenUuid: defToken?.uuid,
//                 attackWeapon: missileItem.name,
//                 effAML: dialogResult.attack.effective,
//                 mlType: 'AML',
//                 defense: 'None',
//                 effDML: 0,
//                 attackMods: dialogResult.attack.mods,
//                 defendMods: [],
//                 attackRoll: roll.rollObj.total,
//                 atkRollResult: roll.description,
//                 defenseRoll: 0,
//                 defRollResult: '',
//                 resultDesc,
//                 hitAlternate,
//                 vsText: victoryStarsText.text,
//                 atkWins: roll.isSuccess,
//                 defWins: false,
//                 atkIsSuccess: isStrike,
//                 defIsSuccess: false,
//                 atkIsCritical: roll.isCritical,
//                 defIsCritical: false,
//                 numAtkTA: numTAs,
//                 numDefTA: 0,
//                 atkImpactJson: isStrike ? JSON.stringify(dialogResult.impact) : '',
//                 defImpactJson: '',
//                 isProjectile: true,
//                 atkZoneDieFormula: dialogResult.zoneDieFormula,
//                 defZoneDieFormula: "",
//                 isAtkStumbleTest: isStumble,
//                 isAtkFumbleTest: isFumble,
//                 isDefStumbleTest: false,
//                 isDefFumbleTest: false,
//                 atkHandlerTokenUuid: atkToken.uuid,
//                 defHandlerTokenUuid: defToken?.uuid
//             };
//         } else {
//             // Prepare for Chat Message
//             const chatTemplate = 'systems/sohl/templates/chat/attack-card.html';

//             const chatTemplateData = {
//                 title: `${wpn.name} Melee Attack`,
//                 attacker: atkToken.name,
//                 atkTokenUuid: atkToken.uuid,
//                 defender: defToken.name,
//                 defTokenUuid: defToken.uuid,
//                 weaponType: 'weapon',
//                 weaponName: wpn.name,
//                 weaponId: wpn.id,
//                 zoneDieFormula: dialogResult.zoneDieFormula,
//                 impactLabel: dialogResult.impact.label,
//                 distance: targetDistance,
//                 baseML: dialogResult.attack.basis,
//                 effAML: dialogResult.attack.effective,
//                 amSign: dialogResult.attack.effMod < 0 ? '-' : '+',
//                 attackModAbs: Math.abs(dialogResult.attack.effMod),
//                 attackMods: dialogResult.attack.mods,
//                 impactMods: dialogResult.impact.mods,
//                 attackJson: JSON.stringify(dialogResult.attack),
//                 impactJson: JSON.stringify(dialogResult.impact),
//                 hasDodge: true,
//                 hasBlock: true,
//                 hasCounterstrike: true,
//                 hasIgnore: true,
//                 handlerActorUuid: defToken.actor.uuid,
//                 isTA,
//                 bodyLocation
//             };
//         }

//         const html = await renderTemplate(chatTemplate, chatTemplateData);

//         const messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.OTHER
//         };

//         const messageOptions = {};

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions);
//         if (game.settings.get("sohl", sohl.SOHL.CONST.SETTINGS.combatAudio.key)) {
//             AudioHelper.play({ src: "sounds/drums.wav", autoplay: true, loop: false }, true);
//         }

//         const updateData = { "flags.legendary.didCombat": true };
//         await atkToken.combatant.update(updateData);

//         return chatTemplateData;
//     }

//     /**
//      * @typedef {object} MeleeResumeChatData
//      * @param {string} title Chat card title
//      * @param {string} attacker Name of attacker
//      * @param {string} atkTokenUuid UUID of Attacking Token
//      * @param {string} defender Name of defender
//      * @param {string} defTokenUuid UUID of Defending Token
//      * @param {string} attackWeapon Name of attacker's weapon
//      * @param {string} defendWeapon Name of defender's weapon
//      * @param {string} mlType Either 'AML' or 'DML'
//      * @param {string} defense Description of defense
//      * @param {number} effAML Attack EML after all modifiers applied
//      * @param {number} effDML Defense EML after all modifiers applied
//      * @param {object} attackMods Modifiers to attack ML
//      * @param {object} defendMods Modifiers to defense ML
//      * @param {number} attackRoll The dice roll result for the attack
//      * @param {string} attackRollResult Description of the result of the attack roll
//      * @param {number} defenseRoll The dice roll result for the defense
//      * @param {string} defRollResult Description of the result of the defense roll
//      * @param {string} resultDesc Final overall description of the result
//      * @param {string} vsText Victory Stars textual representation
//      * @param {boolean} atkWins Attacker causes impact on defender
//      * @param {boolean} defWins Defender avoids impact
//      * @param {boolean} atkIsSuccess Attacker rolled a success
//      * @param {boolean} defIsSuccess Defender rolled a success
//      * @param {boolean} atkIsCritical Attakcer rolled a critical value
//      * @param {boolean} defIsCritical Defender rolled a critical value
//      * @param {number} numAtkTA Number of Tactical Advantages the attacker gets
//      * @param {number} numDefTA Number of Tactical Advantages the defender gets
//      * @param {string} atkTAChoices String listing the available TA choices to the attacker
//      * @param {string} defTAChoices String listing the avaialble TA choices to the defender
//      * @param {boolean} atkHasTAAction Does the attacker have an Action TA?
//      * @param {boolean} defHasTAAction Does the defender have an Action TA?
//      * @param {string} atkImpactJson JSON string representing the attacker's impact object
//      * @param {string} defImpactJson JSON string representing the defender's impact object (such as in counterstrike)
//      * @param {boolean} isProjectile Is this attack a projectile attack?
//      * @param {number} atkZoneDice Zone die for the attacker
//      * @param {number} atkZoneTarget Zone target for the attacker
//      * @param {number} defZoneDice Zone die for the defender
//      * @param {number} defZoneTarget Zone target for the defender
//      * @param {boolean} isAtkStumbleTest Does the attacker perform a stumble roll?
//      * @param {boolean} isAtkFumbleTest Does the attacker perform a fumble roll?
//      * @param {boolean} isDefStumbleTest Does the defender perform a stumble roll?
//      * @param {boolean} isDefFumbleTest Does the defender perform a fumble roll?
//      * @param {string} atkHandlerTokenUuid UUID of token whose ruleset to use to resolve the attacker button presses
//      * @param {string} defHandlerTokenUuid UUID of token whose ruleset to use to resolve the defender button presses
//      */

//     /**
//      * Resume the attack with the defender performing the "Counterstrike" defense.
//      * Note that this defense is only applicable to melee attacks.
//      *
//      * @param {object} options
//      * @param {Token} [options.atkToken] Token representing the attacker
//      * @param {object} [options.atkWeapon] The weapon the attacker is using
//      * @param {object} [options.attack] The full attack object, including base ML, effective ML, success level modifier, and mods
//      * @param {object} [options.impact] The full impact object, including impact die, modifier, aspect, and mods
//      * @param {number} [options.zoneDie] The selected zone die for the attack
//      * @param {number} [options.zoneOffset] The selected zone target for the attack
//      * @param {boolean} [isTA=false] Is this defense a response to a tactical advantage
//      * @param {number} [numPrecisionTAs=0] Number of Precision TAs the attacker has
//      * @returns {MeleeResumeChatData} Data that was used to create chat message
//      */
//     async meleeCounterstrikeResume({ atkToken, atkWeapon, attack, impact, atkZDFormula } = {}) {
//         if (!LgndCharacterCreatureActorRuleset._isLivingToken(atkToken)) return null;

//         const defToken = this.token;
//         if (!defToken) {
//             ui.notifications.warn(`There is no token for the actor ${this.name}, cannot perform counterstrike`);
//             return null;
//         }

//         if (!defToken.isOwner) {
//             ui.notifications.warn(`You do not have permissions to perform this operation on ${defToken.name}`);
//             return null;
//         }

//         const targetRange = sohl.Utility.rangeToTarget(defToken, atkToken, false);

//         const defWeaponId = await LgndCharacterCreatureActorRuleset._selectWeaponDialog(defToken, targetRange, { type: 'weapon' });
//         if (!defWeaponId) return null;

//         const defWeapon = defToken.actor.getItem(defWeaponId);

//         const csDialogResult = await LgndCharacterCreatureActorRuleset._attackDialog({
//             distance: targetRange,
//             type: 'Counterstrike',
//             attackToken: defToken,
//             defendToken: atkToken,
//             weapon: foundry.utils.deepClone(defWeapon)
//         });
//         if (!csDialogResult) return null;

//         const csDefense = csDialogResult.attack;

//         if (atkWeapon.traits.opponentDefenseMod) {
//             csDefense.add(`${atkWeapon.name} Opponent Defense`, 'OppDef', atkWeapon.traits.opponentDefenseMod);
//             LgndUtility.applyMods(csDefense);
//         }

//         const csReachPenalty = Math.max(0, atkToken.actor.system.combatReach - csOptions.weapon.reach) * -5;
//         if (csReachPenalty) {
//             csDefense.add("Reach Penalty", "Rch", csReachPenalty);
//             LgndUtility.applyMods(csDefense);
//         }

//         // Roll Attacker's Attack
//         const atkRoll = await LgndDice.rollTest({
//             data: {},
//             diceSides: 100,
//             diceNum: 1,
//             successLevelMod: attack.successLevelMod,
//             target: attack.effective
//         });

//         // Roll Counterstrike Attack
//         const defRoll = await LgndDice.rollTest({
//             data: {},
//             diceSides: 100,
//             diceNum: 1,
//             successLevelMod: csDefense.successLevelMod,
//             target: csDefense.effective
//         });

//         // If we have "Dice So Nice" module, roll them dice!
//         if (game.dice3d) {
//             atkRoll.rollObj.dice[0].options.colorset = "glitterparty";
//             await game.dice3d.showForRoll(atkRoll.rollObj, game.user, true);

//             defRoll.rollObj.dice[0].options.colorset = "bloodmoon";
//             await game.dice3d.showForRoll(defRoll.rollObj, game.user, true);
//         }

//         const combatResult = LgndCharacterCreatureActorRuleset._meleeCombatResult(atkRoll, defRoll, 'counterstrike');
//         const victoryStarsText = this.victoryStarsText(combatResult.victoryStars);
//         LgndUtility.applyMods(dialogResult.impact);

//         const chatData = {
//             title: `Attack Result`,
//             attacker: atkToken.name,
//             atkTokenUuid: atkToken.uuid,
//             defender: defToken.name,
//             defTokenUuid: defToken.uuid,
//             attackWeapon: atkWeapon.name,
//             defendWeapon: csOptions.weapon.name,
//             mlType: 'AML',
//             defense: `CX (${csOptions.weapon.name})`,
//             effAML: attack.effective,
//             effDML: csDefense.effective,
//             attackMods: attack.mods,
//             defendMods: csDefense.mods,
//             attackRoll: atkRoll.rollObj.total,
//             atkRollResult: atkRoll.description,
//             defenseRoll: defRoll.rollObj.total,
//             defRollResult: defRoll.description,
//             resultDesc: combatResult.desc,
//             vsText: victoryStarsText.text,
//             atkWins: combatResult.atkSuccess,
//             defWins: combatResult.defSuccess,
//             numAtkTA: combatResult.atkTA,
//             numDefTA: combatResult.defTA,
//             atkIsSuccess: atkRoll.isSuccess,
//             defIsSuccess: defRoll.isSuccess,
//             atkIsCritical: atkRoll.isCritical,
//             defIsCritical: defRoll.isCritical,
//             atkImpactJson: combatResult.atkSuccess ? JSON.stringify(impact) : '',
//             defImpactJson: combatResult.defSuccess ? JSON.stringify(csDialogResult.impact) : '',
//             isProjectile: false,
//             atkZoneDieFormula: atkZDFormula,
//             defZoneDieFormula: LgndInjuryRuleset.calcZoneDieFormula(csDialogResult.zoneDie, csDialogResult.zoneOffset),
//             isAtkStumbleTest: !atkRoll.isSuccess && atkRoll.lastDigit === 5,
//             isAtkFumbleTest: !atkRoll.isSuccess && atkRoll.lastDigit === 0,
//             isDefStumbleTest: !defRoll.isSuccess && defRoll.lastDigit === 5,
//             isDefFumbleTest: !defRoll.isSuccess && defRoll.lastDigit === 0,
//             atkHandlerTokenUuid: atkToken.uuid,
//             defHandlerTokenUuid: defToken.uuid
//         }

//         let chatTemplate = "systems/sohl/templates/chat/attack-result-card.html";

//         const html = await renderTemplate(chatTemplate, chatData);

//         let messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.OTHER
//         };

//         const messageOptions = {};

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions)

//         const updateData = { "flags.legendary.didCombat": true };
//         await defToken.combatant.update(updateData);

//         return chatData;
//     }

//     /**
//      * Resume the attack with the defender performing the "Dodge" defense.
//      *
//      * @param {object} options
//      * @param {Token} [options.atkToken] Token representing the attacker
//      * @param {object} [options.atkWeapon] The weapon the attacker is using
//      * @param {object} [options.attack] The full attack object, including base ML, effective ML, success level modifier, and mods
//      * @param {object} [options.impact] The full impact object, including impact die, modifier, aspect, and mods
//      * @param {number} [options.zoneDie] The selected zone die for the attack
//      * @param {number} [options.zoneOffset] The selected zone target for the attack
//      * @param {boolean} [isTA=false] Is this defense a response to a tactical advantage
//      * @returns {MeleeResumeChatData} Data that was used to create chat message
//      */
//     async dodgeResume({ atkToken, atkWeapon, attack, impact, atkZDFormula } = {}) {
//         if (!LgndCharacterCreatureActorRuleset._isLivingToken(atkToken)) return null;

//         const defToken = this.token;
//         if (!defToken) {
//             ui.notifications.warn(`There is no token for the actor ${this.name}, cannot perform counterstrike`);
//             return null;
//         }

//         if (!defToken.isOwner) {
//             ui.notifications.warn(`You do not have permissions to perform this operation on ${defToken.name}`);
//             return null;
//         }

//         const atkRoll = await LgndDice.rollTest({
//             data: {},
//             diceSides: 100,
//             diceNum: 1,
//             successLevelMod: attack.successLevelMod,
//             target: attack.effective
//         });

//         const defense = foundry.utils.deepClone(defToken.actor.getCombatStat('Dodge'));

//         const defRoll = await LgndDice.rollTest({
//             data: {},
//             diceSides: 100,
//             diceNum: 1,
//             successLevelMod: defense.successLevelMod,
//             target: defense.effective
//         });

//         if (game.dice3d) {
//             const aRoll = atkRoll.rollObj;
//             aRoll.dice[0].options.colorset = "glitterparty";
//             await game.dice3d.showForRoll(aRoll, game.user, true);

//             const dRoll = defRoll.rollObj;
//             dRoll.dice[0].options.colorset = "bloodmoon";
//             await game.dice3d.showForRoll(dRoll, game.user, true);
//         }

//         const combatResult = LgndCharacterCreatureActorRuleset._meleeCombatResult(atkRoll, defRoll, 'dodge');
//         // If this attack is the result of a TA, no more TAs are allowed
//         const victoryStarsText = this.victoryStarsText(combatResult.victoryStars);
//         LgndUtility.applyMods(dialogResult.impact);

//         const chatData = {
//             title: `Attack Result`,
//             attacker: atkToken.name,
//             atkTokenUuid: atkToken.uuid,
//             defender: defToken.name,
//             defTokenUuid: defToken.uuid,
//             attackWeapon: atkWeapon.name,
//             effAML: attack.effective,
//             mlType: 'AML',
//             defense: 'Dodge',
//             effAML: attack.effective,
//             effDML: defToken.actor.getCombatStat('Dodge').effective,
//             attackMods: attack.mods,
//             defendMods: defToken.actor.getCombatStat('Dodge'),
//             attackRoll: atkRoll.rollObj.total,
//             atkRollResult: atkRoll.description,
//             defenseRoll: defRoll.rollObj.total,
//             defRollResult: defRoll.description,
//             resultDesc: combatResult.desc,
//             vsText: victoryStarsText.text,
//             atkWins: combatResult.atkSuccess,
//             defWins: combatResult.defSuccess,
//             numAtkTA: combatResult.atkTA,
//             numDefTA: combatResult.defTA,
//             atkIsSuccess: atkRoll.isSuccess,
//             defIsSuccess: defRoll.isSuccess,
//             atkIsCritical: atkRoll.isCritical,
//             defIsCritical: defRoll.isCritical,
//             atkImpactJson: combatResult.atkSuccess ? JSON.stringify(impact) : '',
//             defImpactJson: '',
//             isProjectile: false,
//             atkZoneDieFormula: atkZDFormula,
//             defZoneDieFormula: "",
//             isAtkStumbleTest: !atkRoll.isSuccess && atkRoll.lastDigit === 5,
//             isAtkFumbleTest: !atkRoll.isSuccess && atkRoll.lastDigit === 0,
//             isDefStumbleTest: !defRoll.isSuccess && defRoll.lastDigit === 5,
//             isDefFumbleTest: !defRoll.isSuccess && defRoll.lastDigit === 0,
//             atkHandlerTokenUuid: atkToken.uuid,
//             defHandlerTokenUuid: defToken.uuid
//         }

//         let chatTemplate = "systems/sohl/templates/chat/attack-result-card.html";

//         const html = await renderTemplate(chatTemplate, chatData);

//         let messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.OTHER
//         };

//         const messageOptions = {};

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions)
//         if (combatResult.defSuccess && game.settings.get("sohl", sohl.SOHL.CONST.SETTINGS.combatAudio.key)) {
//             AudioHelper.play({ src: "systems/sohl/audio/swoosh1.ogg", autoplay: true, loop: false }, true);
//         }

//         const updateData = { "flags.legendary.didCombat": true };
//         await defToken.combatant.update(updateData);

//         return chatData;
//     }

//     /**
//      * Resume the attack with the defender performing the "Block" defense.
//      *
//      * @param {Token} [options.atkToken] Token representing the attacker
//      * @param {object} [options.atkWeapon] The weapon the attacker is using
//      * @param {object} [options.attack] The full attack object, including base ML, effective ML, success level modifier, and mods
//      * @param {object} [options.impact] The full impact object, including impact die, modifier, aspect, and mods
//      * @param {number} [options.zoneDie] The selected zone die for the attack
//      * @param {number} [options.zoneOffset] The selected zone target for the attack
//      * @param {boolean} [isTA=false] Is this defense a response to a tactical advantage
//      * @param {number} [numPrecisionTAs=0] Number of Precision TAs the attacker has
//      * @returns {MeleeResumeChatData} Data that was used to create chat message
//      */
//     async blockResume({ atkToken, defToken, atkWeapon, attack, impact, zoneDie, zoneOffset } = {}) {
//         if (!LgndCharacterCreatureActorRuleset._isLivingToken(atkToken) || !LgndCharacterCreatureActorRuleset._isLivingToken(defToken)) return null;
//         if (!defToken.isOwner) {
//             ui.notifications.warn(`You do not have permissions to perform this operation on ${defToken.name}`);
//             return null;
//         }

//         // By default we want to block with the weapon with the largest
//         // defense ML.
//         let weapons = defToken.actor.system.weapons.filter(w => !w.traits.noBlock);
//         weapons.concat(defToken.actor.itemTypes.combattechnique.filter(ct => !ct.traits.noBlock))
//         let defaultWeapon = weapons.reduce((defaultWeapon, curWpn) => {
//             if (!defaultWeapon) return curWpn;
//             if (curWpn.defense.block.effective > defaultWeapon.defense.block.effective) {
//                 return curWpn;
//             } else {
//                 return defaultWeapon;
//             }
//         }, null);

//         if (!weapons.length) {
//             ui.notifications.warn(`${defToken.name} has no weapons that can be used for blocking, block defense refused.`);
//             return null;
//         }

//         const weaponId = await LgndCharacterCreatureActorRuleset._selectWeaponDialog(defToken, 0, { type: 'weapon', defaultWeaponId: defaultWeapon.id });
//         if (!weaponId) return null;

//         const weaponItem = defToken.actor.getItem(weaponId);

//         const atkReachPenalty = Math.max(0, atkWeapon.reach - weaponItem.reach) * -5;
//         if (atkReachPenalty) {
//             attack.add(LGND.CONST.MODS.REACH.NAME, LGND.CONST.MODS.REACH.ABBR, atkReachPenalty);
//             LgndUtility.applyMods(attack);
//         }

//         const atkRoll = await LgndDice.rollTest({
//             data: {},
//             diceSides: 100,
//             diceNum: 1,
//             successLevelMod: attack.successLevelMod,
//             target: attack.effective
//         });

//         const defRoll = await LgndDice.rollTest({
//             data: {},
//             diceSides: 100,
//             diceNum: 1,
//             successLevelMod: options.weapon.defense.block.successLevelMod,
//             target: options.weapon.defense.block.effective
//         });

//         if (game.dice3d) {
//             const aRoll = atkRoll.rollObj;
//             aRoll.dice[0].options.colorset = "glitterparty";
//             await game.dice3d.showForRoll(aRoll, game.user, true);

//             const dRoll = defRoll.rollObj;
//             dRoll.dice[0].options.colorset = "bloodmoon";
//             await game.dice3d.showForRoll(dRoll, game.user, true);
//         }

//         let taChoice = {
//             "Action": 0,
//             "Setup": 0
//         };
//         const combatResult = LgndCharacterCreatureActorRuleset._meleeCombatResult(atkRoll, defRoll, 'block');
//         // If this attack is the result of a TA, no more TAs are allowed
//         const victoryStarsText = this.victoryStarsText(combatResult.victoryStars);
//         LgndUtility.applyMods(dialogResult.impact);

//         const chatData = {
//             title: `Attack Result`,
//             attacker: atkToken.name,
//             atkTokenUuid: atkToken.uuid,
//             defender: defToken.name,
//             defTokenUuid: defToken.uuid,
//             attackWeapon: atkWeapon.name,
//             effAML: attack.effective,
//             mlType: 'AML',
//             defense: `Block w/ ${weaponItem.name}`,
//             effAML: attack.effective,
//             effDML: weaponItem.defense.block.effective,
//             attackMods: attack.mods,
//             defendMods: weaponItem.defense.block.mods,
//             attackRoll: atkRoll.rollObj.total,
//             atkRollResult: atkRoll.description,
//             defenseRoll: defRoll.rollObj.total,
//             defRollResult: defRoll.description,
//             resultDesc: combatResult.desc,
//             vsText: victoryStarsText.text,
//             atkWins: combatResult.atkSuccess,
//             defWins: combatResult.defSuccess,
//             numAtkTA: combatResult.atkTA,
//             numDefTA: combatResult.defTA,
//             atkIsSuccess: atkRoll.isSuccess,
//             defIsSuccess: defRoll.isSuccess,
//             atkIsCritical: atkRoll.isCritical,
//             defIsCritical: defRoll.isCritical,
//             atkImpactJson: combatResult.atkSuccess ? JSON.stringify(impact) : '',
//             defImpactJson: '',
//             isProjectile: false,
//             atkZoneDie: zoneDie,
//             atkZoneTarget: zoneOffset,
//             isAtkStumbleTest: !atkRoll.isSuccess && atkRoll.lastDigit === 5,
//             isAtkFumbleTest: !atkRoll.isSuccess && atkRoll.lastDigit === 0,
//             isDefStumbleTest: !defRoll.isSuccess && defRoll.lastDigit === 5,
//             isDefFumbleTest: !defRoll.isSuccess && defRoll.lastDigit === 0,
//             atkHandlerTokenUuid: atkToken.uuid,
//             defHandlerTokenUuid: defToken.uuid
//         }

//         let chatTemplate = "systems/sohl/templates/chat/attack-result-card.html";

//         const html = await renderTemplate(chatTemplate, chatData);

//         let messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.OTHER
//         };

//         const messageOptions = {};

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions)
//         if ((combatResult.atkSuccess || combatResult.defSuccess) && game.settings.get("sohl", sohl.SOHL.CONST.SETTINGS.combatAudio.key)) {
//             AudioHelper.play({ src: "systems/sohl/audio/shield-bash.ogg", autoplay: true, loop: false }, true);
//         }

//         const updateData = { "flags.legendary.didCombat": true };
//         await defToken.combatant.update(updateData);

//         return chatData;
//     }

//     /**
//      * Resume the attack with the defender performing the "Ignore" defense.
//      *
//      * @param {Token} [options.atkToken] Token representing the attacker
//      * @param {object} [options.atkWeapon] The weapon the attacker is using
//      * @param {object} [options.attack] The full attack object, including base ML, effective ML, success level modifier, and mods
//      * @param {object} [options.impact] The full impact object, including impact die, modifier, aspect, and mods
//      * @param {number} [options.zoneDie] The selected zone die for the attack
//      * @param {number} [options.zoneOffset] The selected zone target for the attack
//      * @param {boolean} [isTA=false] Is this defense a response to a tactical advantage
//      * @param {number} [numPrecisionTAs=0] Number of Precision TAs the attacker has
//      * @returns {MeleeResumeChatData} Data that was used to create chat message
//      */
//     async ignoreResume({ atkToken, atkWeapon, attack, impact, zoneDie, zoneOffset } = {}) {
//         if (!LgndCharacterCreatureActorRuleset._isLivingToken(atkToken)) return null;
//         const defToken = this.token;

//         if (!defToken) {
//             ui.notifications.warn(`There is no token for the actor ${this.name}, cannot perform counterstrike`);
//             return null;
//         }

//         if (!defToken.isOwner) {
//             ui.notifications.warn(`You do not have permissions to perform this operation on ${defToken.name}`);
//             return null;
//         }

//         const atkRoll = await LgndDice.rollTest({
//             data: {},
//             diceSides: 100,
//             diceNum: 1,
//             successLevelMod: attack.successLevelMod,
//             target: attack.effective
//         });

//         const effDML = 0;

//         if (game.dice3d) {
//             const aRoll = atkRoll.rollObj;
//             aRoll.dice[0].options.colorset = "glitterparty";
//             await game.dice3d.showForRoll(aRoll, game.user, true);
//         }

//         const combatResult = LgndCharacterCreatureActorRuleset._meleeCombatResult(atkRoll, null, 'ignore');
//         const victoryStarsText = this.victoryStarsText(combatResult.victoryStars);

//         const chatData = {
//             title: `Attack Result`,
//             attacker: atkToken.name,
//             atkTokenUuid: atkToken.uuid,
//             defender: defToken.name,
//             defTokenUuid: defToken.uuid,
//             attackWeapon: atkWeapon.name,
//             effAML: attack.effective,
//             mlType: 'AML',
//             defense: 'Ignore',
//             effDML: 0,
//             attackMods: attack.mods,
//             defendMods: [],
//             attackRoll: atkRoll.rollObj.total,
//             atkRollResult: atkRoll.description,
//             defenseRoll: 0,
//             defRollResult: '',
//             resultDesc: combatResult.desc,
//             vsText: victoryStarsText.text,
//             atkWins: combatResult.atkSuccess,
//             defWins: combatResult.defSuccess,
//             atkIsSuccess: atkRoll.isSuccess,
//             defIsSuccess: false,
//             atkIsCritical: atkRoll.isCritical,
//             defIsCritical: false,
//             numAtkTA: combatResult.atkTA,
//             numDefTA: 0,
//             atkTAChoices: taAllList.join(', '),
//             defTAChoices: null,
//             atkHasTAAction: true,
//             defHasTAAction: false,
//             atkImpactJson: combatResult.atkSuccess ? JSON.stringify(impact) : '',
//             defImpactJson: '',
//             isProjectile: false,
//             atkZoneDie: zoneDie,
//             atkZoneTarget: zoneOffset,
//             isAtkStumbleTest: !atkRoll.isSuccess && atkRoll.lastDigit === 5,
//             isAtkFumbleTest: !atkRoll.isSuccess && atkRoll.lastDigit === 0,
//             isDefStumbleTest: false,
//             isDefFumbleTest: false,
//             atkHandlerTokenUuid: atkToken.uuid,
//             defHandlerTokenUuid: defToken.uuid
//         }

//         let chatTemplate = "systems/sohl/templates/chat/attack-result-card.html";

//         const html = await renderTemplate(chatTemplate, chatData);

//         let messageData = {
//             user: game.user.id,
//             speaker: this.speaker,
//             content: html.trim(),
//             style: CONST.CHAT_MESSAGE_STYLES.OTHER
//         };

//         const messageOptions = {};

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions)

//         return chatData;
//     }

//     /* --------------------------------------------------------------- */
//     // Helper Methods
//     /* --------------------------------------------------------------- */
//     /**
//      * Determine if the token is valid (must be either a 'creature' or 'character')
//      *
//      * @param {Token} token
//      */
//     static _isLivingToken(token) {
//         if (!token) {
//             ui.notifications.warn('No token selected.');
//             return false;
//         }

//         if (token.actor.type !== 'container') {
//             return true;
//         } else {
//             ui.notifications.warn(`Token ${token.name} is not a character or creature.`);
//             return false;
//         }
//     }

//     /*dumpActorCSV() {
//         const defaultSkills = new Collection(game.items.filter(it => it.type ===LgndSkillData.TYPENAME).map(it => {
//             return [it.name, -1];
//         }));

//         const csvAry = [];

//         csvAry.push(['Name', 'STR','END','DEX','AGL','PER','CML','AUR','WIL','REA','CRE','EMP','ELO'].concat(Array.from(defaultSkills.keys())));
//         game.actors.forEach(this => {
//             const out = [actor.name,
//                 actor.system.attributes.strength.base,
//                 actor.system.attributes.endurance.base,
//                 actor.system.attributes.dexterity.base,
//                 actor.system.attributes.agility.base,
//                 actor.system.attributes.perception.base,
//                 actor.system.attributes.comeliness.base,
//                 actor.system.attributes.aura.base,
//                 actor.system.attributes.will.base,
//                 actor.system.attributes.reasoning.base,
//                 actor.system.attributes.creativity.base,
//                 actor.system.attributes.empathy.base,
//                 actor.system.attributes.eloquence.base,
//             ];

//             const skills = foundry.utils.deepClone(defaultSkills);
//             actor.items.forEach(it => {
//                 if (it.type ===LgndSkillData.TYPENAME) {
//                     if (skills.has(it.name)) {
//                         skills.set(it.name, it.system.masteryLevel.base);
//                     }
//                 }
//             });

//             csvAry.push(out.concat(Array.from(defaultSkills.values())));
//         });

//         const outStr = csvAry.reduce((outs, ary) => {
//             let aryStr = ary.join(',') + '\n';
//             outs += aryStr;
//             return outs;
//         }, '');

//         saveDataToFile(outStr, 'text/plain', 'actordump.csv');
//     }*/

//     /*--------------------------------------------------------------------------------*/
//     /*        INJURY ROLL PROCESSING
//     /*--------------------------------------------------------------------------------*/

//     /**
//      * Performs processing, including a random roll, to determine
//      * injury location and effects.
//      *
//      * @param {Object} options
//      * @param {String} options.impactVal Impact damage
//      * @param {String} options.aspect One of 'Blunt', 'Edged', 'Piercing', or 'Fire'
//      * @param {Integer} options.zoneDieFormula The zone die formula (e.g., 'd4+4')
//      * @param {Integer} options.armorReduction Amount of armor reduction to apply
//      * @param {boolean} options.extraBleedRisk Is there a chance of severe bleeding?
//      * @param {boolean} options.isMissile Is this injury a missile injury?
//      * @param {Boolean} options.skipDialog Skip the dialog box
//      */
//     async injuryRoll({ impactVal = 0, aspect = 'Blunt', zoneDieFormula, armorReduction = 0, extraBleedRisk = false, isMissile = false,
//         skipDialog = false, numPrecisionTAs = 0 } = {}) {
//         const actorData = this.system;
//         const actorItems = this.items;

//         const secsToNextCheck = game.settings.get("sohl", sohl.SOHL.CONST.SETTINGS.healingSeconds.key);
//         const hitLocations = actorItems.reduce((prev, cur) => {
//             return cur.system instanceof BodyLocationData ? prev.concat(cur.name) : prev;
//         }, ['Random']);

//         // Create the Roll instance
//         const dlgResult = await this.#injuryDialog({
//             skipDialog,
//             hitLocations,
//             zoneDieFormula,
//             secsToNextCheck,
//             isMissile,
//             extraBleedRisk,
//             impactVal,
//             aspect,
//             armorReduction,
//             numPrecisionTAs
//         });

//         if (!dlgResult) return null;

//         const result = await this.#calcInjury(dlgResult);

//         // If user cancelled the roll, then return immediately
//         if (!result) return null;

//         if (this.isToken) result.tokenId = this.tokenId;

//         if (result.addToCharSheet) {
//             this.#createInjury(result);
//         }

//         result.maxZones = actorData.maxZones;
//         result.outsideZone = result.zoneNum > result.maxZones;

//         // Prepare for Chat Message
//         const chatTemplate = 'systems/sohl/templates/chat/injury-card.html';

//         result.title = `${name} Injury`;
//         result.handlerActorUuid = this.uuid;
//         if (this.isToken) {
//             result.tokenId = this.token.id;
//         } else {
//             result.actorId = this.id;
//         }

//         const html = await renderTemplate(chatTemplate, result);

//         const messageData = {
//             speaker: this.speaker,
//             content: html.trim(),
//             user: game.user.id,
//             style: CONST.CHAT_MESSAGE_STYLES.OTHER,
//             sound: CONFIG.sounds.notify
//         };

//         const messageOptions = {
//             rollMode: game.settings.get("core", "rollMode")
//         };

//         // Create a chat message
//         await ChatMessage.create(messageData, messageOptions);
//         if (game.settings.get("sohl", sohl.SOHL.CONST.SETTINGS.combatAudio.key)) {
//             AudioHelper.play({ src: "systems/sohl/audio/grunt1.ogg", autoplay: true, loop: false }, true);
//         }
//         return result;
//     }

//     /**
//      *
//      * @param {*} actor
//      * @param {*} result
//      */
//     #createInjury(result) {
//         if (result.injuryLevel.effective <= 0) return;

//         let injuryData = foundry.utils.deepClone(game.system.model.Item.injury);

//         injuryData.injuryLevel = { base: result.injuryLevel };
//         injuryData.healingRate = { base: result.healingRate };
//         injuryData.aspect = result.aspect;
//         injuryData.isBleeding = result.isBleeding;
//         injuryData.extraBleedRisk = result.extraBleedRisk;
//         injuryData.isMissile = result.isMissile;
//         injuryData.isGlancing = result.isGlancing;
//         injuryData.bodyLocation = result.bodyLocationName;
//         injuryData.nextCheckTime = result.nextCheckTime;

//         const createData = {
//             name: result.name,
//             type: InjuryItemData.typeName,
//             data: injuryData
//         };

//         const item = Item.create(createData, { parent: this });

//         return item;
//     }

//     /**
//      * @typedef InjuryDialogResponse
//      * @property {string} location
//      * @property {number} impactVal
//      * @property {string} aspect
//      * @property {boolean} isMissile
//      * @property {boolean} extraBleedRisk
//      * @property {number} armorReduction
//      * @property {string} zoneDieFormula
//      * @property {number} nextCheckTime
//      * @property {boolean} addToCharSheet
//      */

//     /**
//      * Render a dialog box for gathering information for use in the Injury roll
//      *
//      * @param {object} options
//      * @param {boolean} [options.skipDialog]
//      * @param {string[]} [options.hitLocations]
//      * @param {string} [options.zoneDieFormula]
//      * @param {number} [options.secsToNextCheck]
//      * @param {boolean} [options.isMissile]
//      * @param {boolean} [options.extraBleedRisk]
//      * @param {number} [options.impactVal]
//      * @param {string} [options.aspect]
//      * @param {number} [options.armorReduction]
//      * @returns {InjuryDialogResponse}
//      */
//     async #injuryDialog({
//         skipDialog,
//         hitLocations,
//         zoneDieFormula,
//         secsToNextCheck,
//         isMissile,
//         extraBleedRisk,
//         impactVal,
//         aspect,
//         numPrecisionTAs = 0,
//         armorReduction } = {}) {

//         const recordInjury = game.settings.get("sohl", sohl.SOHL.CONST.SETTINGS.recordInjuries.key);

//         const result = {
//             location: hitLocations[0],
//             impactVal,
//             aspect,
//             isMissile,
//             extraBleedRisk,
//             armorReduction,
//             zoneDieFormula,
//             numPrecisionTAs,
//             nextCheckTime: secsToNextCheck ? game.time.worldTime + secsToNextCheck : 0,
//             addToCharSheet: recordInjury !== 'disable'
//         };

//         if (skipDialog) return impactVal ? result : null;

//         // Render modal dialog
//         let dlgTemplate = "systems/sohl/templates/dialog/injury-dialog.html";

//         const html = await renderTemplate(dlgTemplate, {
//             hitLocations,
//             location: hitLocations[0],
//             impactVal,
//             aspect,
//             zoneDie: Math.min(4, this.system.maxZones),
//             zoneOffset: 0,
//             zoneDieChoices: BodyZoneData.dice.reduce((ary, zd) => (zd <= this.system.maxZones) ? ary.concat([zd]) : ary, []),
//             zoneDieFormula,
//             numPrecisionTAs,
//             secsToNextCheck,
//             askRecordInjury: recordInjury === 'ask',
//             armorReduction
//         });

//         // Create the dialog window
//         return await Dialog.prompt({
//             title: "Determine Injury",
//             content: html.trim(),
//             label: "Determine Injury",
//             callback: async html => {
//                 const form = html[0].querySelector("form");
//                 if (!zoneDieFormula) {
//                     const formZoneDie = Number.parseInt(form.zoneDie.value, 10) || 0;
//                     const formZoneOffset = Number.parseInt(form.zoneOffset.value, 10) || 0;
//                     zoneDieFormula = LgndInjuryRuleset.calcZoneDieFormula(formZoneDie, formZoneOffset);
//                 }
//                 const formSecsToNextCheck = Number.parseInt(form.secsToNextCheck.value, 10) || 432000;  // 5 days in seconds

//                 result.location = form.location.value;
//                 result.aspect = form.aspect.value;
//                 result.impactVal = Number.parseInt(form.impactVal.value, 10) || 0;
//                 result.zoneDieFormula = zoneDieFormula;
//                 result.nextCheckTime = game.time.worldTime + formSecsToNextCheck;
//                 result.isMissile = form.isMissile.checked;
//                 result.extraBleedRisk = form.extraBleedRisk.checked;
//                 result.armorReduction = Number.parseInt(form.armorReduction.value, 10) || 0;
//                 result.addToCharSheet = recordInjury === 'ask' ? form.addToCharSheet.checked : recordInjury !== 'disable';
//                 result.numPrecisionTAs = Number.parseInt(form.numPrecisionTAs.value, 10) || 0;
//                 return result;
//             },
//             rejectClose: false
//         });
//     }

//     /**
//      * Return either the item specified by location, or if location === 'Random',
//      * then randomly chooses a location and returns the item associated with it.
//      *
//      * @param {*} location
//      * @param {*} zoneDieFormula
//      */
//     async #calcInjuryLocation(location, zoneDieFormula) {
//         const actorData = this.system;

//         let result = { locItem: null, partItem: null, zoneItem: null, zoneNumber: 0 };

//         if (location !== 'Random') {
//             result.locItem = this.items.find(it => it.system instanceof BodyLocationData && it.name === location);
//         } else {
//             /* -------- Determine Body Zone -------------- */

//             const roll = await Roll.create(zoneDieFormula).roll();
//             result.zoneNumber = roll.total;
//             if (result.zoneNumber > 0 && result.zoneNumber <= actorData.maxZones) {

//                 // zoneItem is the zone that was selected
//                 result.zoneItem = this.items.find(it => it.system instanceof BodyZoneData && it.system.zoneNumbers.includes(result.zoneNumber));

//                 /* -------- Determine Body Part -------------- */

//                 let rollWeight = Math.floor(MersenneTwister.random() * result.zoneItem.probWeight.getProperty('sum')) + 1;
//                 result.partItem = this.items.filter(it => it.system instanceof BodyPartData && it.system.zone === result.zoneItem.name).reduce((foundPart, curPart) => {
//                     if (foundPart) return foundPart;
//                     rollWeight -= curPart.system.probWeight.effective;
//                     return (rollWeight <= 0) ? curPart : foundPart;
//                 }, null);

//                 /* -------- Determine Body Location ---------- */

//                 rollWeight = Math.floor(MersenneTwister.random() * result.partItem.probWeight.getProperty('sum')) + 1;

//                 result.locItem = this.items.filter(it => it.system instanceof BodyLocationData && it.system.location.bodyPartName === result.partItem.name).reduce((foundLoc, curLoc) => {
//                     if (foundLoc) return foundLoc;
//                     rollWeight -= curLoc.system.location.probWeight.effective;
//                     return (rollWeight <= 0) ? curLoc : foundLoc;
//                 }, null);
//             } else {
//                 // Even though there was a weapon "hit", the zone is outside the allowed zones,
//                 // so it is effectively a "miss"
//                 return result;
//             }
//         }

//         return result;
//     }

//     /**
//      * This method calculates many items related to injuries that are used to populate
//      * the chat message with the results of the injury
//      *
//      * @param {Object} options
//      */
//     async #calcInjury({ location, impactVal, aspect, isMissile, extraBleedRisk, armorReduction,
//         zoneDieFormula, nextCheckTime, addToCharSheet, numPrecisionTAs } = {}) {

//         const result = {
//             type: InjuryItemData.typeName,
//             isRandom: location === 'Random',
//             name: 'Misc Injury',
//             aspect: aspect || 'Blunt',
//             bodyLocationName: location || 'Nowhere',
//             isMissile: isMissile,
//             extraBleedRisk: extraBleedRisk,
//             isBleeding: false,
//             bodyPartName: 'None',
//             bodyZoneName: 'None',
//             zoneNum: 0,
//             impactVal,
//             effImpact: impactVal,
//             nextCheckTime: nextCheckTime,
//             compoundInjury: false,
//             severity: '',
//             armorType: 'None',
//             origArmorValue: 0,
//             armorValue: 0,
//             isGlancing: false,
//             isInjured: false,
//             injuryLevel: 0,
//             injuryLevelText: InjuryData.injuryLevels[0],
//             healingRate: -1,
//             isFumble: false,
//             isStumble: false,
//             isAmputate: false,
//             amputatePenalty: 0,
//             shockIndex: 0,
//             addToCharSheet: addToCharSheet
//         };

//         // determine location of injury
//         let locResult = null;
//         const possibleLocations = [];
//         const dieRolls = numPrecisionTAs + 1;  // We always have at least one die roll
//         for (let i = 0; i < dieRolls; i++) {
//             let lr = await this.#calcInjuryLocation(location, zoneDieFormula);
//             if (lr && lr.locItem) {
//                 if (!possibleLocations.includes(lr)) possibleLocations.push(lr);
//             }
//         }

//         if (possibleLocations.length === 1) {
//             locResult = possibleLocations[0];
//         } else if (possibleLocations.length > 1) {
//             let dlgHtml = `
//             <form>
//             <div class="form-group">
//                     <label>Choose Hit Location:</label>
//                     <select name="hitLocation">`;
//             possibleLocations.forEach(loc => {
//                 dlgHtml += `<option value="${loc.locItem.id}">${loc.locItem.name}</option>`;
//             });
//             dlgHtml += '</select></div></form>';
//             let locItemId = await Dialog.prompt({
//                 title: "Choose Hit Location",
//                 content: dlgHtml.trim(),
//                 label: "OK",
//                 callback: async (html) => {
//                     const form = html[0].querySelector("form");
//                     return form.hitLocation.value;
//                 },
//                 rejectClose: false
//             });
//             locResult = possibleLocations.find(pl => pl.locItem.id === locItemId);
//         }

//         if (!locResult || !locResult.locItem) {
//             // this means we couldn't find the location, so no injury
//             result.impactVal = 0;
//             result.addToCharSheet = false;
//             return result;
//         }

//         result.zoneNum = locResult.zoneNumber;

//         // Just to make life simpler, get the system property which is what we really care about.
//         const blData = locResult.locItem.system;

//         result.bodyLocationName = locResult.locItem.name;
//         result.bodyZoneName = locResult.zoneItem.name;
//         result.bodyPartName = locResult.partItem.name
//         result.name = result.bodyLocationName;

//         result.armorType = !blData.layers ? 'None' : blData.layers;

//         // determine effective impact (impact - armor)
//         if (result.aspect === 'Blunt') {
//             result.origArmorValue = blData.blunt.effective;
//         } else if (result.aspect === 'Edged') {
//             result.origArmorValue = blData.edged.effective;
//         } else if (result.aspect === 'Piercing' || result.aspect === 'Projectile') {
//             result.origArmorValue = blData.piercing.effective;
//         } else {
//             result.origArmorValue = blData.fire.effective;
//         }

//         result.armorValue = Math.max(0, result.origArmorValue - armorReduction);
//         result.effImpact = Math.max(0, result.impactVal - result.armorValue);

//         let injuryLevel = 0;
//         result.isInjured = true;

//         // Determine Injury Level
//         if (result.effImpact <= 0) {
//             injuryLevel = 0;
//             result.isInjured = false;
//             result.addToCharSheet = false;
//         } else if (result.effImpact >= 20) {
//             injuryLevel = 5;
//         } else if (result.effImpact >= 15) {
//             injuryLevel = 4;
//         } else if (result.effImpact >= 10) {
//             injuryLevel = 3;
//         } else if (result.effImpact >= 5) {
//             injuryLevel = 2;
//         } else if (result.effImpact > 0) {
//             injuryLevel = 1;
//         }

//         // Calculation for Compound Injury
//         if (result.isInjured) {
//             // Only check for compound injuries if there are existing injuries in this same area
//             const injSameArea = this.items.filter(it => it.system instanceof InjuryItemData && it.system.bodyLocation === locResult.locItem.name);
//             if (injSameArea.length) {
//                 let totalIL = injuryLevel;
//                 let maxIL = injuryLevel;
//                 injSameArea.forEach(i => {
//                     const il = i.system.injuryLevel.effective;
//                     totalIL += il;
//                     maxIL = Math.max(maxIL, il);
//                 });

//                 // Instead of rolling dice, simply get a random number from 1-10
//                 const ciRoll = Math.floor(MersenneTwister.random() * 10) + 1;

//                 if (ciRoll <= totalIL) {
//                     // We have a compound injury
//                     if (injuryLevel === maxIL) {
//                         // The current injury is the worst injury, so simply increase it by one
//                         injuryLevel++;
//                         result.compoundInjury = true;
//                     } else {
//                         // Find which injury is the worst one, and increase it's injury level by 1
//                         maxInjury = injSameArea.find(i => i.system.injuryLevel === maxIL);
//                         if (maxInjury) {
//                             const updateData = {};
//                             if (maxInjury.system.isGlancing) {
//                                 updateData['system.isGlancing'] = false;
//                             } else {
//                                 updateData['system.injuryLevel.base'] = maxInjury.system.injuryLevel.base + 1;
//                             }
//                             await maxInjury.update(updateData);
//                         }
//                         result.addToCharSheet = false;
//                     }
//                 }
//             }
//         }

//         result.shockIndex = blData.shockValue + injuryLevel;

//         // Character will fumble/stumble when a grevious injury occurs
//         if (injuryLevel >= 4) {
//             result.isFumble ||= blData.isFumble;
//             result.isStumble ||= blData.isStumble;
//         }

//         // Amputation may occur when a G5 or worse injury occurs
//         if (injuryLevel >= 5) {
//             if (blData.amputatePenalty > 0) {
//                 result.amputatePenalty = blData.amputatePenalty;
//                 result.isAmputate = true;
//             }
//         }

//         // M1 injuries (not compound injuries) against rigid armor can instead be glancing blows
//         if (blData.isRigid && !result.compoundInjury && injuryLevel === 1) {
//             result.isGlancing = ['Edged', 'Piercing', 'Projectile'].includes(result.aspect);
//         }

//         result.injuryLevel = injuryLevel;
//         result.injuryLevelText = injuryLevel >= 5 ? `G${injuryLevel}` : InjuryData.injuryLevels[injuryLevel];
//         result.severity = result.injuryLevelText.charAt(0);
//         const injDesc = LGND.CONST.INJURYDESC[result.aspect][result.severity];
//         result.name = `${result.bodyLocationName} ${injDesc || ''}`;

//         // In this section we calculate whether the injury is a bleeder
//         let bleedIL = result.injuryLevel;
//         if (extraBleedRisk) {
//             // We have an injury that is particularly suseptible to bleeding (e.g., broadhead arrow)
//             // Calculate effective IL for bleeding (only used for bleeding calculations).
//             const effImpact = result.effImpact + 4;
//             if (effImpact <= 0) {
//                 bleedIL = 0;
//             } else if (effImpact >= 20) {
//                 bleedIL = 5;
//             } else if (effImpact >= 15) {
//                 bleedIL = 4;
//             } else if (effImpact >= 10) {
//                 bleedIL = 3;
//             } else if (effImpact >= 5) {
//                 bleedIL = 2;
//             } else if (effImpact > 0) {
//                 bleedIL = 1;
//             }
//         }

//         if (bleedIL) {
//             // Bleeding only occurs if the severity equals or exceeds a threshold specified in the
//             // armor location data for that location.
//             if (bleedIL >= blData.bleedingSevThreshold) {
//                 // Blunt wounds only cause bleeding when Sev >= 5
//                 // Piercing wounds only cause bleeding when Sev >= 4
//                 // Edged wounds only cause bleeding when Sev >= 3
//                 result.isBleeding = (bleedIL >= 3 && result.aspect === 'Edged') ||
//                     (bleedIL >= 4 && result.aspect === 'Piercing') ||
//                     (bleedIL >= 5 && result.aspect === 'Blunt');
//             }
//         }

//         return result;
//     }
// }

export class LgndCommands extends sohl.Commands {
    static async importActors(jsonFilename, folderName) {
        const response = await fetch(jsonFilename);
        const content = await response.json();

        let actorFolder = game.folders.find(
            (f) => f.name === folderName && f.type === "Actor",
        );
        if (actorFolder) {
            const msg = `Folder ${folderName} exists, delete it before proceeding`;
            console.error(msg);
            return;
        }

        actorFolder = await Folder.create({ type: "Actor", name: folderName });

        await sohl.Utility.asyncForEach(content.Actor, async (f) => {
            console.log("Processing Animate Entity ${f.name}");
            const actor = await sohl.SohlActor.create({ name: f.name });
            const updateData = [];
            const itemData = [];
            // Fill in attribute values
            Object.keys(f.system.attributes).forEach((attr) => {
                const attrItem = actor.items.find(
                    (it) =>
                        it.system instanceof sohl.TraitItemData &&
                        it.name.toLowerCase() === attr,
                );
                if (attrItem)
                    itemData.push({
                        _id: attrItem.id,
                        "system.textValue": f.system.attributes[attr].base,
                    });
            });

            updateData.push({
                "system.description": f.system.description,
                "system.bioImage": f.system.bioImage,
                "system.biography": f.system.biography,
                "prototypeToken.actorLink": f.prototypeToken.actorLink,
                "prototypeToken.name": f.prototypeToken.name,
                "prototypeToken.texture.src": f.prototypeToken.texture.src,
                folder: actorFolder.id,
                items: itemData,
            });

            await actor.update(updateData);
        });
    }
}
sohl.SOHL.cmds = LgndCommands;

const LgndActorDataModels = foundry.utils.mergeObject(
    sohl.SohlActorDataModels,
    {
        [sohl.AnimateEntityActorData.typeName]: LgndAnimateEntityActorData,
    },
    { inplace: false },
);

const LgndItemDataModels = foundry.utils.mergeObject(
    sohl.SohlItemDataModels,
    {
        [sohl.MysticalAbilityItemData.typeName]: LgndMysticalAbilityItemData,
        [sohl.TraitItemData.typeName]: LgndTraitItemData,
        [sohl.SkillItemData.typeName]: LgndSkillItemData,
        [sohl.InjuryItemData.typeName]: LgndInjuryItemData,
        [sohl.DomainItemData.typeName]: LgndDomainItemData,
        [sohl.AfflictionItemData.typeName]: LgndAfflictionItemData,
        [sohl.BodyZoneItemData.typeName]: LgndBodyZoneItemData,
        [sohl.BodyPartItemData.typeName]: LgndBodyPartItemData,
        [sohl.BodyLocationItemData.typeName]: LgndBodyLocationItemData,
        [sohl.MeleeWeaponStrikeModeItemData.typeName]:
            LgndMeleeWeaponStrikeModeItemData,
        [sohl.MissileWeaponStrikeModeItemData.typeName]:
            LgndMissileWeaponStrikeModeItemData,
        [sohl.CombatTechniqueStrikeModeItemData.typeName]:
            LgndCombatTechniqueStrikeModeItemData,
        [sohl.ArmorGearItemData.typeName]: LgndArmorGearItemData,
        [sohl.WeaponGearItemData.typeName]: LgndWeaponGearItemData,
    },
    { inplace: false },
);

const LgndModifiers = foundry.utils.mergeObject(
    sohl.SohlModifiers,
    {
        ImpactModifier: LgndImpactModifier,
        MasteryLevelModifier: LgndMasteryLevelModifier,
    },
    { inplace: false },
);

export const verData = {
    id: "legendary",
    label: "Song of Heroic Lands: Legendary Edition",
    CONFIG: {
        Helper: {
            modifiers: LgndModifiers,
            contextMenu: sohl.SohlContextMenu,
        },
        Actor: {
            documentClass: sohl.SohlActor,
            documentSheets: [
                {
                    cls: sohl.SohlActorSheet,
                    types: Object.keys(LgndActorDataModels),
                },
            ],
            dataModels: LgndActorDataModels,
            typeLabels: sohl.SohlActorTypeLabels,
            typeIcons: sohl.SohlActorTypeIcons,
            types: Object.keys(LgndActorDataModels),
            defaultType: sohl.AnimateEntityActorData.typeName,
            compendiums: ["sohl.leg-characters", "sohl.leg-creatures"],
        },
        Item: {
            documentClass: sohl.SohlItem,
            documentSheets: [
                {
                    cls: sohl.SohlItemSheet,
                    types: Object.keys(LgndItemDataModels).filter(
                        (t) => t !== sohl.ContainerGearItemData.typeName,
                    ),
                },
                {
                    cls: sohl.SohlContainerGearItemSheet,
                    types: [sohl.ContainerGearItemData.typeName],
                },
            ],
            dataModels: LgndItemDataModels,
            typeLabels: sohl.SohlItemTypeLabels,
            typeIcons: sohl.SohlItemTypeIcons,
            types: Object.keys(LgndItemDataModels),
            compendiums: [
                "sohl.leg-characteristics",
                "sohl.leg-possessions",
                "sohl.leg-mysteries",
            ],
        },
        ActiveEffect: {
            documentClass: sohl.SohlActiveEffect,
            dataModels: {
                [sohl.SohlActiveEffectData.typeName]: sohl.SohlActiveEffectData,
            },
            typeLabels: {
                [sohl.SohlActiveEffectData.typeName]:
                    sohl.SohlActiveEffectData.typeLabel.singular,
            },
            typeIcons: { [sohl.SohlActiveEffectData.typeName]: "fas fa-gears" },
            types: [sohl.SohlActiveEffectData.typeName],
            legacyTransferral: false,
        },
        Macro: {
            documentClass: sohl.SohlMacro,
            documentSheet: sohl.SohlMacroConfig,
        },
    },
    CONST: foundry.utils.mergeObject(sohl.SOHL.CONST, LGND.CONST, {
        inplace: false,
    }),
};
