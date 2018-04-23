import { v2 } from 'cloudinary';
import BaseController from './base.controller';

class ReservationController extends BaseController {
    /**
     * Sử dụng cloundinary để lưu trữ file
     * Tham khảo cách tạo cấu hình và sử dụng tại: https://cloudinary.com/documentation/node_integration
     */
    constructor() {
        super();
        v2.config({ // Khởi tạo cấu hình cloudinary
            cloud_name: 'dexlemenr',
            api_key: '625469548386774',
            api_secret: 'AyRFCzCp5J8d3t76GKY6moUVaCA',
        });
    }

    /**
     * Upload một file
    * @param {req} req Thông tin từ client gủi lên đã được đính kèm thêm thuộc tính file do kết quả của middleware multer
    * @param {res} res Đối số được gọi để trả về kết quả sau khi upload file thành công
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu upload thành công trả về các đối tượng file
     */
    upload = async (req, res, next) => {
        const { path } = req.file;
        v2.uploader.upload(path, { tags: 'file' }, (err, image) => {
            if (err) {
                next(err);
            }
            res.status(201).json(image);
        });
    }
}

export default new ReservationController();
