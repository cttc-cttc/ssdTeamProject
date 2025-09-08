package com.study.ssd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${email.from.name:SSD Study Team}")

    private String fromName;

    @Value("${email.service.provider:naver}")
    private String emailProvider;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendPasswordResetEmail(String to, String resetToken, String userNickname) {
        String resetUrl = "http://localhost:5173/password-reset?token=" + resetToken;

        // 실제 이메일 전송 (HTML 형식)
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("[SSD Study Team] 비밀번호 재설정 요청");
            
            // HTML 이메일 본문 생성
            String htmlEmailBody = String.format("""
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                </head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background-color: #3d6647; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                            <h1 style="margin: 0;">🔐 비밀번호 재설정 요청</h1>
                        </div>
                        <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px;">
                            <p style="margin: 0 0 15px 0;">안녕하세요, <strong>%s</strong>님!</p>
                            <p style="margin: 0 0 20px 0;">비밀번호 재설정 요청을 받았습니다. 아래 버튼을 클릭하여 새로운 비밀번호를 설정해주세요.</p>
                            
                            <div style="text-align: center; margin: 20px 0;">
                                <a href="%s" style="display: inline-block; background-color: #3d6647; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">비밀번호 재설정하기</a>
                            </div>
                            
                            <p style="margin: 20px 0 10px 0;"><strong>⚠️ 주의사항:</strong></p>
                            <ul style="margin: 0; padding-left: 20px;">
                                <li style="margin: 5px 0;">이 링크는 <strong>10분</strong> 후에 만료됩니다.</li>
                                <li style="margin: 5px 0;">한 번만 사용할 수 있습니다.</li>
                                <li style="margin: 5px 0;">비밀번호 재설정을 요청하지 않으셨다면 이 이메일을 무시해주세요.</li>
                            </ul>
                            
                            <p style="margin: 20px 0 10px 0;">링크가 작동하지 않는 경우, 아래 주소를 복사하여 브라우저에 붙여넣어주세요:</p>
                            <p style="background-color: #e9e9e9; padding: 10px; border-radius: 3px; word-break: break-all; font-family: monospace; margin: 0;">%s</p>
                        </div>
                        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
                            <p style="margin: 0;">감사합니다.<br>SSD Study Team</p>
                        </div>
                    </div>
                </body>
                </html>
                """, userNickname, resetUrl, resetUrl);
            
            helper.setText(htmlEmailBody, true);
            
            mailSender.send(message);
            
        } catch (Exception e) {
            throw new RuntimeException("이메일 전송에 실패했습니다. (" + emailProvider + ")", e);
        }
    }

    // 이메일 서비스 상태 확인
    public String getEmailServiceInfo() {
        return String.format("현재 이메일 서비스: %s, 발신자명: %s",
                            emailProvider.toUpperCase(), fromName);
    }
}
