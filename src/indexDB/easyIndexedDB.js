export default class easyIndexedDB {
  constructor(dbName, version, storeName, schema) {
    this.dbName = dbName; // 数据库名称
    this.version = version; // 数据库版本
    this.storeName = storeName; // 数据表名称
    this.schema = schema; // 数据表字段 schema
    this.db = null; // 数据库实例
    this.init(); // 初始化数据库
  }

  // 初始化数据库和数据表
  init() {
    const request = indexedDB.open(this.dbName, this.version);

    request.onupgradeneeded = (event) => {
      this.db = event.target.result;
      if (!this.db.objectStoreNames.contains(this.storeName)) {
        const objectStore = this.db.createObjectStore(this.storeName, {
          keyPath: "key",
        });
        this.schema.forEach((field) =>
          objectStore.createIndex(field, field, { unique: false })
        );
        console.log(
          `创建数据表 '${this.storeName}'，字段 schema: ${this.schema}`
        );
      }
    };

    request.onsuccess = (event) => {
      this.db = event.target.result;
      console.log(`数据库 '${this.dbName}' 成功打开.`);
    };

    request.onerror = (event) => {
      console.error(`打开数据库时发生错误: ${event.target.error}`);
    };
  }

  // 确保数据库已初始化
  ensureDbInitialized() {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject("数据库未初始化");
      } else {
        resolve();
      }
    });
  }

  // 添加或更新数据
  add(data) {
    return this.ensureDbInitialized().then(() => {
      const tx = this.db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);

      return new Promise((resolve, reject) => {
        const request = store.get(data.key);

        request.onsuccess = () => {
          const existingData = request.result;

          if (existingData) {
            // 如果数据已存在，进行更新
            Object.assign(existingData, data);
            const updateRequest = store.put(existingData);

            updateRequest.onsuccess = () => {
              console.log(`更新成功，key '${data.key}' 的数据:`, existingData);
              resolve();
            };

            updateRequest.onerror = () => {
              console.error(
                `更新 key '${data.key}' 的数据时发生错误: ${updateRequest.error}`
              );
              reject(updateRequest.error);
            };
          } else {
            // 如果数据不存在，进行添加
            const addRequest = store.add(data);

            addRequest.onsuccess = () => {
              console.log(`数据添加成功:`, data);
              resolve();
            };

            addRequest.onerror = () => {
              console.error(`添加数据时发生错误: ${addRequest.error}`);
              reject(addRequest.error);
            };
          }
        };

        request.onerror = () => {
          console.error(`获取数据时发生错误: ${request.error}`);
          reject(request.error);
        };
      });
    });
  }

  // 根据 key 或指定的键值对查找数据
  get(keyOrQuery) {
    return this.ensureDbInitialized().then(() => {
      const tx = this.db.transaction(this.storeName);
      const store = tx.objectStore(this.storeName);

      return new Promise((resolve, reject) => {
        // 如果传入的是对象，则进行索引查找
        if (typeof keyOrQuery === "object") {
          const [queryKey, queryValue] = Object.entries(keyOrQuery)[0];
          const index = store.index(queryKey);
          const request = index.get(queryValue);

          request.onsuccess = () => {
            console.log(
              `根据 ${queryKey}='${queryValue}' 成功获取数据:`,
              request.result
            );
            resolve(request.result);
          };

          request.onerror = () => {
            console.error(
              `根据 ${queryKey}='${queryValue}' 获取数据时发生错误: ${request.error}`
            );
            reject(request.error);
          };
        } else {
          // 如果传入的是 key，则直接通过 key 查找
          const request = store.get(keyOrQuery);

          request.onsuccess = () => {
            console.log(
              `根据 key '${keyOrQuery}' 成功获取数据:`,
              request.result
            );
            resolve(request.result);
          };

          request.onerror = () => {
            console.error(
              `根据 key '${keyOrQuery}' 获取数据时发生错误: ${request.error}`
            );
            reject(request.error);
          };
        }
      });
    });
  }

  // 更新数据，可以通过 key 或键值对查找
  update(keyOrQuery, newData) {
    return this.get(keyOrQuery).then((data) => {
      if (!data) {
        console.error(`没有找到数据`);
        return Promise.reject(`没有找到数据`);
      }
      Object.assign(data, newData); // 合并更新数据

      return this.ensureDbInitialized().then(() => {
        const tx = this.db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);

        return new Promise((resolve, reject) => {
          const updateRequest = store.put(data);

          updateRequest.onsuccess = () => {
            console.log(`更新成功，数据:`, data);
            resolve();
          };

          updateRequest.onerror = () => {
            console.error(`更新数据时发生错误: ${updateRequest.error}`);
            reject(updateRequest.error);
          };
        });
      });
    });
  }

  // 删除数据，可以通过 key 或键值对查找
  delete(keyOrQuery) {
    return this.get(keyOrQuery).then((data) => {
      if (!data) {
        console.error(`没有找到数据`);
        return Promise.reject(`没有找到数据`);
      }

      return this.ensureDbInitialized().then(() => {
        const tx = this.db.transaction(this.storeName, "readwrite");
        const store = tx.objectStore(this.storeName);

        return new Promise((resolve, reject) => {
          const deleteRequest = store.delete(data.key);

          deleteRequest.onsuccess = () => {
            console.log(`成功删除 key '${data.key}' 的数据`);
            resolve();
          };

          deleteRequest.onerror = () => {
            console.error(
              `删除 key '${data.key}' 的数据时发生错误: ${deleteRequest.error}`
            );
            reject(deleteRequest.error);
          };
        });
      });
    });
  }

  // 事务操作，支持多个操作
  transaction(operations) {
    return this.ensureDbInitialized().then(() => {
      const tx = this.db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);

      return new Promise((resolve, reject) => {
        operations.forEach((op) => {
          const { method, args } = op;

          if (method === "add") {
            const data = args[0];
            const request = store.get(data.key);

            request.onsuccess = () => {
              const existingData = request.result;

              if (existingData) {
                // 如果数据已存在，进行更新
                Object.assign(existingData, data);
                const updateRequest = store.put(existingData);

                updateRequest.onerror = () => {
                  console.error(
                    `更新 key '${data.key}' 的数据时发生错误: ${updateRequest.error}`
                  );
                  reject(updateRequest.error);
                };
              } else {
                // 如果数据不存在，执行添加操作
                const addRequest = store.add(data);

                addRequest.onerror = () => {
                  console.error(`添加数据时发生错误: ${addRequest.error}`);
                  reject(addRequest.error);
                };
              }
            };

            request.onerror = () => {
              console.error(`获取数据时发生错误: ${request.error}`);
              reject(request.error);
            };
          } else if (method === "update") {
            const keyOrQuery = args[0];
            const newData = args[1];

            this.get(keyOrQuery)
              .then((data) => {
                if (data) {
                  Object.assign(data, newData); // 合并更新数据

                  const updateRequest = store.put(data);

                  updateRequest.onerror = () => {
                    console.error(`更新数据时发生错误: ${updateRequest.error}`);
                    reject(updateRequest.error);
                  };
                } else {
                  reject(`没有找到数据`);
                }
              })
              .catch((err) => {
                reject(err);
              });
          } else if (method === "delete") {
            const keyOrQuery = args[0];

            this.get(keyOrQuery)
              .then((data) => {
                if (data) {
                  const deleteRequest = store.delete(data.key);

                  deleteRequest.onerror = () => {
                    console.error(`删除数据时发生错误: ${deleteRequest.error}`);
                    reject(deleteRequest.error);
                  };
                } else {
                  reject(`没有找到数据`);
                }
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            const request = store[method](...args); // 其他操作

            request.onerror = () => {
              console.error(`执行 ${method} 操作时发生错误: ${request.error}`);
              reject(request.error);
            };
          }
        });

        tx.oncomplete = () => {
          console.log("事务成功完成.");
          resolve();
        };

        tx.onerror = (event) => {
          console.error("事务失败: ", event.target.error);
          reject(event.target.error);
        };
      });
    });
  }
}
