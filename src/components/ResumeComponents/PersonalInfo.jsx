import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h2`
  margin-bottom: 15px;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const PersonalInfo = ({ data = {} }) => {
  return (
    <Container>
      <Title>个人信息</Title>
      <Grid>
        <Field>
          <strong>姓名：</strong> {data.name || '点击编辑'}
        </Field>
        <Field>
          <strong>电话：</strong> {data.phone || '点击编辑'}
        </Field>
        <Field>
          <strong>邮箱：</strong> {data.email || '点击编辑'}
        </Field>
        <Field>
          <strong>地址：</strong> {data.address || '点击编辑'}
        </Field>
      </Grid>
    </Container>
  );
};

export default PersonalInfo;