## 快速开始

- 拉取代码
```sh
git clone git@github.com:leecervan904/release-20240110.git
```

- 安装依赖，确保你本地环境已安装 [pnpm](https://pnpm.io/installation)
```sh
cd release-20240110

pnpm i
```


### 启动后端

- 本地环境下通常需要修改后端代码，推荐使用 [本地环境](#本地环境) 的方式。
- 如果不需要修改后端代码，并且本地安装了 Docker，可以使用 [开发环境](#开发环境) 的方式一键启动。


#### 本地环境

前置要求：**已安装配置和 MySQL 环境**，一般有两种方式
1. 用户目录下安装
2. 使用 Docker 的 mysql 镜像启动一个容器，参考


- 复制一份 `packages/www/.env.example` 文件为 `packages/www/.env`，后续开发环境会自动读取这个配置文件的变量传递给 Node.js 的 `process.env`
- 根据你本地数据库的设置，修改 `.env` 文件中的 `DATABASE_URL` 参数
```conf
# DATABASE_URL 提供给 Prisma 建立连接，一些参数如下：

# mysql - 数据库类型
# root - 角色
# localhost - 域名或 ip
# adim12345 - 密码
# 33306 端口号
# release-20240110 - 需要创建的数据库，后续数据会存储到这个数据库中
DATABASE_URL="mysql://root:admin12345@localhost:33306/release-20240110"
```

- 初始化数据库：
  - 首次运行后端时，需要执行一次，用于让 Prisma 初始化数据库
  - 后续，每当修改 Prisma 的 Model 时都要执行
```sh
pnpm db:push
```

- 启动后端服务，默认通过 3000 端口访问后端服务
```sh
pnpm www:dev
```




#### 开发环境


前置要求：使用 `docker-compose` 部署，先保证安装了 [Docker](https://www.docker.com/)，Windows 环境下一般安装 [Docker - Desktop](https://www.docker.com/products/docker-desktop/)

- 启动容器，确保你在项目的根目录执行以下命令
```sh
docker compose -f ./docker-compose/www.yml up -d
```

此后，通过端口 3000 访问后端服务



### 启动前端

- 在项目根目录下，执行命令即可启动，默认端口为 8080
```sh
pnpm app:dev
```



## 部署


### 单独部署：nginx + pm2


- 前端：nginx
- 后端：pm2



### （推荐）一键部署：docker-compose

```sh
docker compose ./docker-compose/docker-compose.yml up -d
```
