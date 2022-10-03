import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import * as mongoose from 'mongoose';

export type GameDocument = Document & Game;

@Schema()
export class Game {
  @Prop({ required: true, maxlength: 50 })
  word: string;

  @Prop({ default: '' })
  chosenLetters: Set<string>;

  @Prop({
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  })
  owner: User;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  })
  players: User[];

  @Prop({ default: 0, required: true })
  turnsPassed: number;

  @Prop({ default: 5, required: true })
  maxPlayers: number;

  @Prop({ default: Date.now(), required: true })
  createdAt: Date;

  @Prop()
  startedAt: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
