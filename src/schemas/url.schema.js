import Joi from 'joi';

const regexUrl = /^https?:\/\//;

const urlSchema = Joi.object({
  url: Joi.string().pattern(regexUrl).required(),
});

export default urlSchema;
