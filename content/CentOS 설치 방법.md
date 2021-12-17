---
title: CentOS 설치 방법
tags:
  - Linux
  - CentOS
---

# 개요

![CentOS Logo](./attachments/centos-logo.png)

운영체제 CentOS를 설치하는 방법을 정리한다.

## 버전

2019년 07월 29일 기준으로 최신 버전인 CentOS 7 1810 버전을 이용하여 설명한다.

# CentOS 다운로드

[https://www.centos.org/download/](https://www.centos.org/download/)

위 경로에서 최신 버전의 CentOS DVD ISO 파일을 다운로드한다.

# CentOS 설치 환경 구성

다음 중 하나의 방식으로 CentOS 설치 환경을 구성한다.

- 로컬 컴퓨터에 VMware 등의 가상화 도구를 이용하여 가상 머신 생성
- 직접 CentOS를 설치할 컴퓨터 준비
  - Rufus 등의 도구를 이용하여 CentOS 설치 USB 생성

# CentOS 설치

설치 이미지를 실행하여 가이드에 따라 한국어를 선택하여 설치를 진행한다.

다음과 같이 설정하고 설치 시작 버튼을 클릭한다.

- 설치 대상
  - 자동 파티션 설정 선택
- 네트워크 및 호스트명
  - 유선으로 ... 연결되었습니다
- 그 외 기본값

설치되는 동안 루트 계정의 암호를 설정하고 관리자 계정을 생성한다.

설치가 완료될 때까지 대기한 후 안내에 따라 기기를 재시작한다.

그러면 CentOS 설치가 완료된다.

# 추가로 확인할 사항

## 방화벽으로 인한 문제

CentOS를 설치하면 기본적으로 방화벽 소프트웨어가 실행되고 있다.

이로 인하여 사용자 설정으로 개방한 포트에 대하여 외부 접근이 불가능할 수 있다.

이 때는 다음과 같이 방화벽에 원하는 서비스나 포트를 등록하여 문제를 해결할 수 있다.

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload
sudo firewall-cmd --permanent --list-all
```

## 기본 소프트웨어 설치

CentOS를 최소 설치를 선택하여 설치하면 설치 속도는 빨라지지만 시스템 관리 및 서비스 구동에 필요한 기본적인 소프트웨어도 설치되어 있지 않은 상태가 된다.

다음 목록을 참고하여 기본 소프트웨어 설치를 위한 패키지를 설치할 수 있다.

- ifconfig
  - net-tools

