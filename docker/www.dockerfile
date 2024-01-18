FROM node:lts-slim

# 设置工作目录
WORKDIR /app

# 安装 libssl-dev => prisma 依赖 libssl
RUN apt-get update && \
  apt-get install -y libssl-dev && \
  rm -rf /var/lib/apt/lists/*

# 复制整个仓库
COPY . .

# 安装依赖
RUN npm install -g pnpm --registry=https://registry.npm.taobao.org
# 仅安装 @release/www 项目以及依赖的项目的依赖
RUN pnpm recursive install --filter @release/www

# 复制 wait-for-it.sh 脚本
COPY ./scripts/wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

# 暴露应用端口
EXPOSE 3000

# 运行应用：使用 wait-for-it.sh 保证 db 已成功启动
# 此外 node 带 alpine 的镜像不支持 bash，因此修改为 slim
CMD ./wait-for-it.sh db:3306 -- pnpm db:push && pnpm www:start
