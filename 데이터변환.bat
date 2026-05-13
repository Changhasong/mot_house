@echo off
chcp 65001 > nul
echo.
echo ========================================
echo   용문동 맛집 블로그 - 데이터 변환 도구
echo ========================================
echo.

python --version > nul 2>&1
if errorlevel 1 (
    echo [오류] Python이 설치되어 있지 않습니다.
    echo.
    echo  1. https://python.org 에서 Python 3 설치
    echo  2. 설치 시 "Add Python to PATH" 반드시 체크
    echo  3. 설치 완료 후 이 파일을 다시 실행하세요.
    echo.
    pause
    exit /b 1
)

echo [1/2] openpyxl 설치 확인 중...
pip install openpyxl -q 2>nul

echo [2/2] 데이터 변환 중...
echo.
python convert.py
