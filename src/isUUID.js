const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const nilUUID = '00000000-0000-0000-0000-000000000000';

function isUUID(value) {
  return uuidRegex.test(value) || nilUUID === value;
}

export default isUUID;
