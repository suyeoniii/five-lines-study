## Summary

### 후기

리팩터링에 다섯줄제한 규칙을 적용하여 책이름이 파이브라인즈 코드인게 흥미로웠음. 여러 리팩터링 규칙들을 소개하고 있고, 리팩터링 규칙 외에도 일상속에서 리팩터링을 어떻게 대해야하는지, 어떻게하면 리팩터링을 더 잘할 수 있을지 알려주는 책

### 코드스멜, 리팩터링 규칙

- 코드 스멜의 예) 함수는 한 가지 작업을 수행해야 한다
- 규칙의 예) 다섯 줄 제한 규칙

### 규칙

- `다섯 줄 제한 규칙`: 메서드는 다섯 줄 이하여야 함

  ```java
  // 3가지 작업을 하는 코드
  public void pay(){
      for (Employee e : employees) { // 1. 직원 목록 for loop 통해 돌기
      if (e.isPaypay()) { // 2. 월급일인지 확인
          // 3. 급여 지급
          Money pay = e.calculatePay();
          e.deliverPay(pay);
      }
      }
  }
  ```

  ```java
    public void pay(){
        for (Employee e : employees)
            payIfNecessary(e);
    }

    private void payIfNecessary(Employee e) {
        if(e.isPayday()){
            calculateAndDeliverPay(e)
        }
    }

    private void calculateAndDeliverPay(Employee e) {
        Money pay = e.calculatePay();
        e.deliverPay(pay);
    }
  ```

- `메서드 추출`: 긴 메서드를 분해하고, 메서드 이름으로 주석을 대신함

  ```ts
   function completeExercise() {
       // 운동기록 저장하기
       ...
       // 운동결과지 생성하기
       ...
   }
  ```

  ```ts
  function completeRoutine() {
      saveRoutineHistory()
      generateRoutineReport()
  }
  function saveRoutineHistory() {
      ...
  }
  function generateRoutineReport() {
      ...
  }
  ```

- if문은 함수의 시작에만 배치
- getter와 setter를 사용하지 말 것 -> 캡슐화 강제
- 공통 접사를 사용하지 말 것을 위한 -> 데이터 캡슐화

  ```ts
  function saveRoutineHistory() {
      ...
  }
  function generateRoutineReport() {
      ...
  }
  ```

  ```ts
  class Routine {
    saveHistory() {
        ...
    }
    generateReport() {
        ...
    }
  }

  ```

### 컴파일러 활용하기

- 컴파일러와 싸우지말고 이용하기
- 컴파일 오류를 투두리스트로 이용 (코드 삭제 후 컴파일)
- 사용하지 않는 코드 찾아내기

### 주석

`유형`

1. 오래된 주석 - 버그를 유발할 수 있으므로 삭제
2. 주석처리된 코드 삭제 - 버전 관리 시스템이 있으므로
3. 불필요한 주석 - 가독성을 더하지 않기때문에 삭제
4. 메서드명으로 대체 - 메서드이름이 될 수 있는 주석 대체
5. 불변속성을 문서화하는 주석 - 코드 또는 자동 테스트로 변환, 불가능하면 주석 유지

### 그 외

- 코드 삭제를 두려워하지 말기
- 작업시간의 20%정도 리팩터링에 사용 -> 금요일에만 리팩터링
- 나쁜 코드를 나쁘게 보이기 위한 방법
  - 긴 메서드 만들기
- `보이 스카우트 규칙`: 항상 여러분이 왔을 때보다 더 좋게 만들어 놓고 떠나세요
- `깨진 유리창이론`: 유리창이 하나 깨지고 나면, 곧 어 많은 유리창이 깨짐
