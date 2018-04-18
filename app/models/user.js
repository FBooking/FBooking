import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Constants from '../config/constants';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  fullName: String,
  username: {
    type: String,
    unique: true,
    required: [true, 'Username đâu?'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email đâu?'],
    validate: {
      validator(email) {
        // eslint-disable-next-line max-len
        const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
        return emailRegex.test(email);
      },
      message: '{VALUE} không phải là một địa chỉ email hợp lệ',
    },
  },
  password: {
    type: String,
    required: [true, 'Password đâu?'],
  },
  idCard: String,
  phoneNumber: String,
  birthDay: String,
  isActive: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Loại bỏ trường password khi trả lại kết quả là thông tin chi tiết của một user
UserSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    delete obj.password;
    return obj;
  },
});

// Đảm bảo email là duy nhất
UserSchema
  .path('email')
  .validate((email, respond) => {
    UserModel.findOne({ email })
      .then((user) => {
        respond(user ? false : true);
      })
      .catch(() => {
        respond(false);
      });
  }, 'Email đã được sử dụng');

// Đảm bảo username là duy nhất
UserSchema
  .path('username')
  .validate((username, respond) => {
    UserModel.findOne({ username })
      .then((user) => {
        respond(user ? false : true);
      })
      .catch(() => {
        respond(false);
      });
  }, 'Username đã được sử dụng');

// Validate password
UserSchema
  .path('password')
  .validate(function(password) {
    return password.length >= 6 && password.match(/\d+/g);
  }, 'Password phải chứa ít nhất 6 ký tự và bao gồm 1 ký tự số');

// Mã hóa mật khẩu trước khi lưu một user
UserSchema
  .pre('save', function(done) {
    if (this.isModified('password')) {
      const { saltRounds } = Constants.security;
      this._hashPassword(this.password, saltRounds, (err, hash) => {
        this.password = hash;
        done();
      });
    } else {
      done();
    }
    // eslint-enable no-invalid-this
  });

/**
 * User Methods
 */
UserSchema.methods = {
  /**
   * Tạo một JSON web token để xác thực thông tin các request
   * @public
   * @return {String} trả về một token duy nhất với thời gian live được quy định tại file Constant thư mục config
   */
  generateToken() {
    return jwt.sign({ _id: this._id }, Constants.security.sessionSecret, {
      expiresIn: Constants.security.sessionExpiration,
    });
  },

  /**
   * Tạo một mật khẩu đã được mã hóa
   * @private
   * @param {String} password
   * @param {Number} saltRounds
   * @param {Function} callback
   * @return {Boolean} một mật khẩu đã được mã hóa
   */
  _hashPassword(password, saltRounds = Constants.security.saltRounds, callback) {
    return bcrypt.hash(password, saltRounds, callback);
  },
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
