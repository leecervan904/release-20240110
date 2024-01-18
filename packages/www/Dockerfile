FROM node:lts-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 到工作目录
COPY package.json ./

# 安装依赖
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install -g pnpm && pnpm install

# 复制应用代码到工作目录
COPY . .

# 暴露应用端口
EXPOSE 3111

# 运行应用
CMD pnpm db:push && pnpm start
