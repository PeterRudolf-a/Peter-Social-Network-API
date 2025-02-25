import { Schema, model, type Document, Types } from "mongoose";

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Schema.Types.ObjectId[];
}

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);

const ThoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    timestamps: true,
  },
);

//getter method to format the Thought createdAt timestamp on query
ThoughtSchema.virtual("createdAt").get(function () {
  return this.createdAt.toISOString();
});

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//getter method to format the Reaction createdAt timestamp on query
reactionSchema.virtual("createdAt").get(function () {
  return this.createdAt.toISOString();
});

const Thought = model<IThought>("Thought", ThoughtSchema);

export default Thought;