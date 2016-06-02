# NOTES

### Front 서버
`node-gyp` 관련 에러가 뜨는 경우, `python` 버전이 2버전대인지 확인해야 한다. 쉽게 파이썬 버전을 바꾸는 방법은 `pyenv`를 쓰면 된다.

```bash
npm install
npm start
```

### API 서버
API 서버의 코드는 파이썬 3.4.3 버전을 기준으로 작성되었다. `pyvenv`를 이용하여 가상환경을 만든 뒤 실행한다. 첫 실행시에는 환경 설정이 필요하다.

```bash
pyvenv venv # create virtual environment
source venv/bin/activate # activate virtual environment
pip install requirements.txt # install packages
```

데이터베이스가 세팅되어 있어야 한다. DBMS는 `mysql` 혹은 `mariadb`를 사용한다. 유저 이름은 `remembered`, 비밀번호는 `growingdever`인 유저가 DBMS에 존재해야 하며, `remembered` 데이터베이스가 필요하다. 정확한 URI는 `app/__init__.py`의 `SQLALCHEMY_DATABASE_URI` 참고. 준비해놓은 데이터를 로드하여 사용하고자 하면 `mysql -u remembered -p remembered < initial.sql` 명령어를 실행하면 된다. 데이터 내용은 `initial.sql` 파일 참고.

마지막으로 서버를 실행하면 ORM 라이브러리에 의해 테이블이 생성된다. `virtualenv`가 켜진 상태로 실행하여야 함을 주의한다.

```bash
python server.py
```
