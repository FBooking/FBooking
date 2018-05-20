import BaseController from './base.controller';
import Session from '../models/session.schema';
import ChildStadium from '../models/childStadium';

class SessionController extends BaseController {

    /**
     * Tìm kiếm thông tin session theo các điều kiện
     * Query có 3 tham số chính: page, perPage và date. "date" truyền vào(gửi lên) có dạng "YYYY-MM-DD". Ví dụ ("2018-04-22")
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm session thành công trả về một object thông tin session đó
     */
    search = async (req, res, next) => {
        const { page, perPage, date, childStadiumId } = req.query;
        let conditions = {};
        const dateSelect = new Date(date); // Chuyển ngày cần tìm sang dạng UTC Time tức là múi giờ gốc là GMT + 0
        const [time, hour] = dateSelect.toLocaleString().split(' '); // Chuyển ngày cần tìm về dạng Local Time tức là múi giờ là múi giờ của system. Sau đó cắt ra thành 2 phần tử. Phần tử thứ nhất là ngày tháng năm, phần thử thứ 2 là giờ phút giây
        const [year, month, day] = time.split('-'); // Cắt chuỗi ngày tháng năm ra thành từng phần tử một
        // console.log(`Ngày ${date} ở dạng UCT Time`, dateSelect);
        // console.log(`Ngày ${date} ở dạng Local Time`, dateSelect.toLocaleString());
        dateSelect.setHours(23, 59, 59, 999); // Set thời gian ngày cần tìm về cuối ngày, tức là 23 giờ 59 phút của ngày đó dạng UTC Time.
        // console.log(`23 giờ 59 phút ngày ${date} ở dạng UCT Time`, dateSelect);
        // console.log(`23 giờ 59 phút ngày ${date} ở dạng Local Time`, dateSelect.toLocaleString());
        const now = new Date(); // Lấy ngày giờ hiện tại dạng UTC Time
        const [timeNow, hourNow] = now.toLocaleString().split(' '); // Chuyển ngày giờ hiện tại về dạng Local Time. Sau đó cắt ra thành 2 phần tử. Phần tử thứ nhất là ngày tháng năm, phần thử thứ 2 là giờ phút giây
        const [yearNow, monthNow, dayNow] = timeNow.split('-'); // Cắt chuỗi ngày tháng năm ra thành từng phần tử một
        const isNow = ((day == dayNow) && (month == monthNow) && (year == yearNow)); // Nếu ngày tháng năm cần tìm = bằng với ngày tháng năm hiện tại thì trả về true, ngược lại là false
        const isOldTime = ((day < dayNow) && (month < monthNow) && (year < yearNow));
        if (childStadiumId) {
            conditions.childStadiumId = childStadiumId;
        }
        if (date) {
            if (isOldTime) { // Nếu ngày tháng năm tìm kiếm nhỏ hơn ngày tháng năm hiện tại thì tìm theo điều kiện này để trả về mảng rỗng
                conditions.startedAt = '';
            } else if (isNow) { // Nếu có tìm theo ngày và ngày cần tìm = ngày tháng năm hiện tại thì tìm các session với điều kiện startedAt từ khoảng ngày giờ hiện tại đến hết ngày hiện tại
                conditions.startedAt = {
                    $gte: now,
                    $lt: dateSelect,
                };
            } else if (!isNow) { // Nếu có tìm theo ngày và ngày cần tìm không phải là ngày hiện tại thì tìm các session với điều kiện thời gian trong ngày cần tìm. Nghĩa là từ 0h đến 24h của ngày đó
                conditions.startedAt = {
                    $gte: new Date(date),
                    $lt: dateSelect,
                };
            }
        }
        try {
            const populateQuery = [
                { path: 'stadiumId', select: { name: 1 } },
            ];
            const sessions = await Session
                .find(conditions)
                .populate(populateQuery)
                .limit(parseInt(perPage, 10))
                .skip((parseInt(page, 10) - 1) * parseInt(perPage, 10));
            const result = await Promise.all(sessions.map(async (session) => {
                const { stadiumId } = session;
                const childStadiums = await ChildStadium.find({ stadiumId: stadiumId._id });
                const newSession = JSON.parse(JSON.stringify(session));
                newSession.childStadiums = childStadiums;
                return newSession;
            }));
            res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tìm kiếm thông tin chi tiết của một session
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tìm kiếm session thành công trả về một object thông tin session đó
     */
    find = async (req, res, next) => {
        try {
            const session = await Session.findOne({ _id: req.params.sessionId });
            const { stadiumId } = session;
            const childStadiums = await ChildStadium.find({ stadiumId: stadiumId });
            const newSession = JSON.parse(JSON.stringify(session));
            newSession.childStadiums = childStadiums;
            res.status(201).json(newSession);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tìm kiếm tất cả các session theo childStadiumId
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tìm kiếm session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Kết quả trả về một array các session
     */
    findByChildStadium = async (req, res, next) => {
        try {
            console.log(req.params.childStadiumId);
            const sessions = await Session.find({ childStadiumId: req.params.childStadiumId });
            console.log(sessions);
            res.status(201).json(sessions);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Tạo một Session
     * Trường "startedAt" và "finishedAt" trong body gửi lên sẽ có dạng Local Time (YYYY-mm-ddTHH:MM:ssZ). Ví dụ "2018-04-22T20:00:00.000+07:00" <- Ngày 20 giờ, 00 phút, 00 giây, ngày 22 tháng 4 năm 2018 theo múi giờ GTM + 7
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu tạo mới session thành công trả về session đó kèm theo id
     */
    create = async (req, res, next) => {
        const session = new Session({
            ...req.body,
        });
        try {
            res.status(201).json(await session.save());
        } catch (err) {
            next(err);
        }
    }

    /**
     * Cập nhật thông tin một Session
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi cập nhật session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu cập nhật session thành công trả về session đó kèm theo id
     */
    update = async (req, res, next) => {
        const { _id, ...otherParams } = req.body;
        try {
            res.status(201).json(await Session.findByIdAndUpdate(_id, otherParams, { new: true }));
        } catch (err) {
            next(err);
        }
    }

    /**
     * Xóa một Session theo id
    * @param {req} req Thông tin từ client gủi lên.
    * @param {res} res Đối số được gọi để trả về kết quả sau khi tạo mới session thành công.
    * @param {next} next Callback argument to the middleware function .
    * @return {void} Nếu xóa thành công trả về một object { n: số lượng record đã xóa, ok: Trạng thái xóa thành công hay thất bại}
     */
    delete = async (req, res, next) => {
        try {
            res.status(201).json(await Session.remove({ _id: req.params.sessionId }));
        } catch (err) {
            next(err);
        }
    }
}

export default new SessionController();
