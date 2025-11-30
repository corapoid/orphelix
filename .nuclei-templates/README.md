# Nuclei Security Templates for Orphelix

This directory contains custom Nuclei templates for security scanning of the Orphelix Kubernetes Dashboard.

## 📋 Overview

[Nuclei](https://github.com/projectdiscovery/nuclei) is a fast, template-based vulnerability scanner. These templates are specifically designed to test Orphelix's security controls.

## 🚀 Quick Start

### Installation

```bash
# Install Nuclei
brew install nuclei  # macOS
# or
go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest

# Update templates
nuclei -update-templates
```

### Running Scans

```bash
# Scan local development server
nuclei -t .nuclei-templates/ -u http://localhost:3000

# Scan with specific template
nuclei -t .nuclei-templates/orphelix-api-security.yaml -u http://localhost:3000

# Scan with rate limiting check
nuclei -t .nuclei-templates/orphelix-rate-limiting.yaml -u http://localhost:3000

# Generate report
nuclei -t .nuclei-templates/ -u http://localhost:3000 -json -o security-scan.json
```

## 📝 Available Templates

### 1. API Security (`orphelix-api-security.yaml`)
- **Purpose**: Verify API endpoints return proper status codes and headers
- **Endpoints Tested**: `/api/dashboard/summary`, `/api/pods`, `/api/deployments`, `/api/namespaces`
- **Checks**:
  - Security headers (X-Frame-Options, CSP, X-Content-Type-Options)
  - Proper content types
  - Authentication requirements

### 2. Rate Limiting (`orphelix-rate-limiting.yaml`)
- **Purpose**: Test rate limiting implementation
- **Endpoints Tested**: `/api/ai/troubleshoot`
- **Checks**:
  - HTTP 429 (Too Many Requests) returned after limit
  - Proper rate limit messages

### 3. XSS Protection (`orphelix-xss-protection.yaml`)
- **Purpose**: Verify XSS attack prevention
- **Attack Vectors**: Script tags, image onerror, malicious input
- **Checks**:
  - Input validation (400/422 status)
  - No script execution in responses
  - Proper error messages

### 4. SQL Injection (`orphelix-sql-injection.yaml`)
- **Purpose**: Test SQL injection protection
- **Attack Vectors**: SQL syntax in API requests
- **Checks**:
  - Input validation
  - No database errors exposed
  - Proper parameter handling

## 🔒 Security Controls Tested

| Control | Template | Expected Result |
|---------|----------|----------------|
| Authentication | `orphelix-api-security.yaml` | 401 for unauthenticated requests |
| Rate Limiting | `orphelix-rate-limiting.yaml` | 429 after exceeding limits |
| XSS Prevention | `orphelix-xss-protection.yaml` | Input sanitization, no script execution |
| SQL Injection | `orphelix-sql-injection.yaml` | Prepared statements, no SQL errors |
| Security Headers | `orphelix-api-security.yaml` | CSP, X-Frame-Options, etc. |

## 📊 Integration with CI/CD

### GitHub Actions

```yaml
name: Security Scan
on: [push, pull_request]

jobs:
  nuclei:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install Nuclei
        run: |
          go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest

      - name: Run Security Scan
        run: |
          # Start app in background
          npm run build && npm run start &
          sleep 10

          # Run Nuclei scan
          nuclei -t .nuclei-templates/ -u http://localhost:3000 -json -o scan-results.json

      - name: Upload Results
        uses: actions/upload-artifact@v3
        with:
          name: nuclei-results
          path: scan-results.json
```

### Pre-Commit Hook

Add to `.githooks/pre-commit`:

```bash
#!/bin/bash

echo "Running security scan..."
if command -v nuclei &> /dev/null; then
    nuclei -t .nuclei-templates/orphelix-api-security.yaml -u http://localhost:3000 -silent

    if [ $? -ne 0 ]; then
        echo "⚠️  Security scan found issues. Please review."
        # Don't block commit, just warn
    fi
fi
```

## 🛠️ Creating Custom Templates

Template structure:

```yaml
id: custom-test
info:
  name: Custom Security Test
  author: your-name
  severity: medium
  description: Test description
  tags: orphelix,custom

http:
  - method: GET
    path:
      - "{{BaseURL}}/api/endpoint"

    matchers:
      - type: status
        status:
          - 200
```

## 📈 Reporting

Generate detailed reports:

```bash
# JSON report
nuclei -t .nuclei-templates/ -u http://localhost:3000 -json -o report.json

# Markdown report
nuclei -t .nuclei-templates/ -u http://localhost:3000 -markdown-export report.md

# SARIF format (for GitHub Code Scanning)
nuclei -t .nuclei-templates/ -u http://localhost:3000 -sarif-export report.sarif
```

## ⚠️ Important Notes

1. **Local Testing Only**: These templates are designed for local development testing
2. **Production Scanning**: Adjust rate limits and payloads for production environments
3. **False Positives**: Review all findings - some may be intentional design decisions
4. **Continuous Updates**: Keep templates updated as new vulnerabilities are discovered

## 🔗 Resources

- [Nuclei Documentation](https://docs.projectdiscovery.io/tools/nuclei)
- [Nuclei Template Guide](https://docs.projectdiscovery.io/templates/introduction)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Orphelix Security Report](../SECURITY_REPORT.md)

## 📞 Support

For security issues or questions:
- GitHub Issues: [orphelix/issues](https://github.com/your-org/orphelix/issues)
- Security Email: security@orphelix.com (if applicable)

---

**Last Updated**: 2025-11-29
**Version**: 1.0.0
