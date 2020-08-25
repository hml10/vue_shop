// 引入uuid
import UUID from "uuidjs";

// 生成零时用户id，并且存储起来
export function getUUID() {
  // 从缓存中读取用户零时id数据
  let uuid = localStorage.getItem("UUID_KEY");

  if (!uuid) {
    // 产生零时用户id---需要长期保存、并且保持不变
    uuid = UUID.generate();
    // 直接进行缓存操作
    localStorage.setItem("UUID_KEY", uuid);
  }
  return uuid;
}
