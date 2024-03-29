# My Scheduler

## Overview
스케줄러 웹 페이지입니다. 개인 스케줄을 관리하기 위한 페이지로 월별 스케줄과 일별 스케줄로 구성되어 있습니다. 월별 스케줄에서는 원하는 날짜에 스케줄을 등록하여 캘린더로 등록된 스케줄을 확인할 수 있으며 등록된 스케줄을 수정, 삭제할 수 있습니다. 일별 스케줄은 Goal(목표), Todo List(할일 목록), Schedules(시간별 스케줄), Diet(식단)으로 구성되어있으며 각각에 대해 데이터를 등록, 변경, 삭제할 수 있습니다. 시간별 스케줄의 경우 테이블 형식으로 스케줄을 등록하면 해당 시간의 칸에 색상으로 표시 후 마우스를 위치시키면 상세정보를 표시합니다.

-----

## Features

### Monthly Schedule
캘린더 형식으로 제작하였으며 년월을 선택할 수 있습니다. 새로운 스케줄을 등록하여 캘린더에 표시할 수 있고 등록된 스케줄을 수정, 삭제할 수 있습니다.

### Daily Schedule
일별 스케줄로 목표, 할일 목록, 시간별 스케줄, 식단으로 구성되어 있습니다. 상단의 년월일 선택으로 원하는 일별 스케줄을 조회할 수 있습니다.
일별 조회 아래의 수정버튼으로 등록된 스케줄을 수정할 수 있습니다.
시간별 스케줄은 테이블 칸에 지정된 시간을 선택하여 손쉽게 시간별 스케줄을 등록할 수 있습니다.

### Authentication
Firebase auth를 이용해 사용자 토큰을 저장하여 사용자별 데이터를 불러오고 수정합니다.

#### Running the Project Locally
``` bash
npm install
npm start ```
