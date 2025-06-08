import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入中文语言包（根据需求替换）

// 全局配置 dayjs
dayjs.locale('zh-cn'); // 设置默认语言

// 可选：添加插件（如 relativeTime、utc 等）
// import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs.extend(relativeTime);

export default dayjs;