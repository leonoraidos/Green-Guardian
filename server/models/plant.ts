import mongoose from '../db';
import { Types } from 'mongoose';
//import { IPlant } from '../types/plants';

const plantSchema = new mongoose.Schema({
  plant_name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true,
    unique: true
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plant_details: {
    type: {
      common_names: {
        type: [String],
        default: []
      },
      edible_parts: {
        type: [String],
        default: []
      },
      scientific_name: {
        type: String,
        default: ''
      },
      structured_name: {
        genus: {
          type: String,
          default: ''
        },
        species: {
          type: String,
          default: ''
        }
      },
      synonyms: {
        type: [String],
        default: []
      },
      taxonomy: {
        class: {
          type: String,
          default: ''
        },
        family: {
          type: String,
          default: ''
        },
        genus: {
          type: String,
          default: ''
        },
        kingdom: {
          type: String,
          default: ''
        },
        order: {
          type: String,
          default: ''
        },
        phylum: {
          type: String,
          default: ''
        }
      },
      url: {
        type: String,
        default: ''
      },
      watering: {
        type: {
          max: {
            type: Number,
            default: null
          },
          min: {
            type: Number,
            default: null
          }
        },
        default: {
          max: null,
          min: null
        }
      }
    },
    required: true
  }
});

const PLANT = mongoose.model('Plant', plantSchema);

export { PLANT };