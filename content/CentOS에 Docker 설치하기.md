---
title: CentOS에 Docker 설치하기
tags:
  - CentOS
  - Docker
---

## 개요

![Docker Logo](./attachments/docker-logo.png)

CentOS에 Docker를 설치하는 방법을 정리한다.

## 설치

### Update packages

다음 명령어로 yum으로 설치된 모든 패키지의 업데이트를 진행한다.

```bash
sudo yum update -y
```

### Docker 설치

다음 명령어로 yum을 이용하여 Docker를 설치한다.

```bash
sudo yum install -y docker
```

다음 명령어로 Docker 서비스를 시작한다.

```bash
sudo systemctl start docker
```

다음 명령어로 부팅 시 Docker 서비스를 자동으로 시작하도록 설정한다.

```bash
sudo systemctl enable docker
```

## 추가로 확인할 사항

### Insecure Registry 등록

다음과 같이 Docker daemon 설정 파일을 수정하여 (없으면 생성) 다음과 같은 구문을 추가한다.

```json /etc/docker/daemon.json
{
  "insecure-registries": ["URL:PORT"]
}
```

그 후 Docker 서비스를 재시작하면 해당 URL에 대하여 Insecure registry 오류가 발생하지 않는다.

하지만 이 설정은 서버와 통신할 때 적절한 인증서 검증을 사용하지 않게 만들기 때문에 주의가 필요하다.

