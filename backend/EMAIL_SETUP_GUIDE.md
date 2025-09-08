# 이메일 서비스 설정 가이드

## 지원되는 이메일 서비스

- **Gmail** (Google)
- **네이버 메일** (Naver)
- **다음 메일** (Daum) - 추가 설정 가능

## 환경 변수 설정

### 1. 네이버 메일 사용 (기본 설정)

#### 네이버 앱 비밀번호 생성:

1. 네이버 메일 로그인 (https://mail.naver.com)
2. 설정 → POP3/IMAP 설정
3. "IMAP/SMTP 사용" 체크
4. "앱 비밀번호" 생성 (16자리)

#### 환경 변수:

```env
# 네이버 메일 설정
NAVER_USERNAME=your-naver-id@naver.com
NAVER_APP_PASSWORD=your-16-digit-app-password

# 이메일 서비스 설정
EMAIL_PROVIDER=naver
EMAIL_FROM_NAME=SSD Study Team
```

### 2. Gmail 사용

#### Gmail 앱 비밀번호 생성:

1. Google 계정 설정 (https://myaccount.google.com)
2. 보안 → 2단계 인증 활성화
3. 앱 비밀번호 생성 (16자리)

#### 환경 변수:

```env
# Gmail 설정
GMAIL_USERNAME=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-digit-app-password

# 이메일 서비스 설정
EMAIL_PROVIDER=gmail
EMAIL_FROM_NAME=SSD Study Team
```

### 3. 다음(Daum) 메일 사용

#### 다음 앱 비밀번호 생성:

1. 다음 메일 로그인 (https://mail.daum.net)
2. 설정 → POP3/IMAP 설정
3. "IMAP/SMTP 사용" 체크
4. "앱 비밀번호" 생성

#### 환경 변수:

```env
# 다음 메일 설정
DAUM_USERNAME=your-daum-id@daum.net
DAUM_APP_PASSWORD=your-16-digit-app-password

# 이메일 서비스 설정
EMAIL_PROVIDER=daum
EMAIL_FROM_NAME=SSD Study Team
```

## application.properties 설정 변경

### 네이버 사용시 (현재 기본 설정):

```properties
spring.mail.host=smtp.naver.com
spring.mail.port=587
spring.mail.username=${NAVER_USERNAME}
spring.mail.password=${NAVER_APP_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.properties.mail.smtp.ssl.trust=smtp.naver.com
```

### Gmail 사용시:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${GMAIL_USERNAME}
spring.mail.password=${GMAIL_APP_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.properties.mail.smtp.ssl.trust=smtp.gmail.com
```

## 테스트 방법

### 1. 이메일 서비스 상태 확인:

```http
GET /api/users/email-service/info
```

### 2. 비밀번호 재설정 테스트:

```http
POST /api/users/password-reset/request
Content-Type: application/json

{
    "userEmail": "test@example.com"
}
```

## 주의사항

1. **앱 비밀번호 필수**: 일반 비밀번호로는 SMTP 인증이 안 됩니다
2. **2단계 인증 필요**: 대부분의 이메일 서비스에서 2단계 인증이 필요합니다
3. **보안 설정**: "보안 수준이 낮은 앱의 액세스" 허용이 필요할 수 있습니다
4. **환경 변수**: `.env` 파일에 실제 값들을 설정해야 합니다

## 이메일 서비스 변경 방법

1. `application.properties`에서 해당 이메일 서비스 설정 주석 해제
2. 다른 이메일 서비스 설정 주석 처리
3. 환경 변수 변경
4. 애플리케이션 재시작

## 문제 해결

### 일반적인 오류:

- **인증 실패**: 앱 비밀번호 확인
- **연결 실패**: 포트 번호 및 호스트 확인
- **보안 오류**: 2단계 인증 및 앱 비밀번호 설정 확인

### 로그 확인:

애플리케이션 로그에서 이메일 전송 상태를 확인할 수 있습니다.
