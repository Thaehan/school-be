import { accounts, students, teachers, topics } from '../Models'
import { IAccount } from '../Types'
import { hashFunction, hashSyncFunction } from './UtilityFunctions'

const Account = accounts
const Student = students
const Teacher = teachers
const Topic = topics

const ADMIN_ACCOUNT = {
  username: 'admin',
  password: '',
  role: 'admin',
}

const listTeachers: any[] = [
  {
    username: 'nburmingham0',
    password: '123456',
    email: 'rsarton0@wufoo.com',
    gender: 'male',
    teacher_code: '68084-444',
    date_of_birth: '1967-01-07T00:34:35.000Z',
    name: {
      first_name: 'Jason',
      last_name: 'Wick',
    },
    phone_number: '278-256-8929',
    address: 'Suite 55',
  },
  {
    username: 'pdarrigoe1',
    password: '123456',
    email: 'lmacentee1@google.cn',
    gender: 'male',
    teacher_code: '0268-0617',
    date_of_birth: '1959-07-07T21:53:49.000Z',
    name: {
      first_name: 'Jason',
      last_name: 'Wick',
    },
    phone_number: '750-743-2077',
    address: '13th Floor',
    topic_ids: [],
  },
  {
    username: 'wdalzell2',
    password: '123456',
    email: 'cstowte2@disqus.com',
    gender: 'male',
    teacher_code: '52685-367',
    date_of_birth: '1952-11-13T05:33:25.000Z',
    name: {
      first_name: 'Jason',
      last_name: 'Wick',
    },
    phone_number: '986-340-2875',
    address: 'Apt 926',
  },
  {
    username: 'tgrevatt3',
    password: '123456',
    email: 'esawforde3@weibo.com',
    gender: 'male',
    teacher_code: '24385-213',
    date_of_birth: '1969-09-07T10:43:41.000Z',
    name: {
      first_name: 'Jason',
      last_name: 'Wick',
    },
    phone_number: '889-558-5412',
    address: 'PO Box 396',
    topic_ids: [],
  },
  {
    username: 'npeaple4',
    password: '123456',
    email: 'lbockings4@delicious.com',
    gender: 'female',
    teacher_code: '43772-0041',
    date_of_birth: '1958-10-11T14:24:16.000Z',
    name: {
      first_name: 'Jason',
      last_name: 'Wick',
    },
    phone_number: '499-412-2577',
    address: 'Apt 1916',
    topic_ids: [],
  },
  {
    username: 'elanston5',
    password: '123456',
    email: 'yrottery5@wordpress.org',
    gender: 'male',
    teacher_code: '0781-3315',
    date_of_birth: '1967-08-03T22:12:25.000Z',
    name: {
      first_name: 'Jason',
      last_name: 'Wick',
    },
    phone_number: '469-873-3834',
    address: 'Room 1375',
  },
  {
    username: 'oglencrosche6',
    password: '123456',
    email: 'amerman6@princeton.edu',
    gender: 'female',
    teacher_code: '57520-0263',
    date_of_birth: '1963-11-13T18:12:34.000Z',
    name: {
      first_name: 'Jason',
      last_name: 'Wick',
    },
    phone_number: '168-363-3400',
    address: 'PO Box 632',
  },
]

const listTopics: any[] = [
  {
    topic_name: 'What is Lorem Ipsum',
    detail:
      "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    topic_name: 'Why do we use it?',
    detail:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
  {
    topic_name: 'Where does it come from?',
    detail:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard.',
  },
]

const listStudents: any[] = [
  {
    username: 'buiquanghieu',
    password: '123456',
    student_code: '68084-444',
    name: {
      first_name: 'Hieu',
      last_name: 'Bui Quang',
    },
    date_of_birth: '2000-01-07T00:34:35.000Z',
    gender: 'male',
    email: 'hieubq@gmail.com',
    phone_number: '278-256-8929',
    address: 'Ha Noi, Viet Nam 55',
  },
  {
    username: 'student1',
    password: '123456',
    student_code: '68084-444',
    name: {
      first_name: 'Thanh',
      last_name: 'Bui',
    },
    date_of_birth: '2000-01-07T00:34:35.000Z',
    gender: 'male',
    email: 'hieubq@gmail.com',
    phone_number: '278-256-8929',
    address: 'Ha Noi, Viet Nam 55',
  },
  {
    username: 'student2',
    password: '123456',
    student_code: '68084-444',
    name: {
      first_name: 'Dat',
      last_name: 'Do',
    },
    date_of_birth: '2000-01-07T00:34:35.000Z',
    gender: 'male',
    email: 'hieubq@gmail.com',
    phone_number: '278-256-8929',
    address: 'Ha Noi, Viet Nam 55',
  },
]

const createAdmin = async () => {
  try {
    const existedAdmin = await Account.findOne({
      username: ADMIN_ACCOUNT.username,
    })

    if (existedAdmin) {
      console.log('Admin existed')
    } else {
      await Account.create({
        ...ADMIN_ACCOUNT,
        password: await hashFunction('123456'),
      })
      await initData()
    }
  } catch (error) {
    console.error(error)
    return
  }
}

const initData = async () => {
  try {
    const teacherToAccount = listTeachers.map((item) => {
      return {
        username: item.username,
        password: hashSyncFunction(item.password),
        role: 'teacher',
      }
    })
    const createdTeacherAccount = await Account.create(teacherToAccount)

    const TeacherAccountWithUserId = createdTeacherAccount.map(
      (data, index) => {
        if (listTeachers[index]) {
          return {
            ...listTeachers[index],
            user_id: data.id,
          }
        }
      }
    )

    const createdTeachers = await Teacher.create(TeacherAccountWithUserId)

    const listTopicWithTeacherId = listTopics.map((item, index) => {
      if (createdTeachers[index]) {
        return {
          ...item,
          teacher_id: createdTeachers[index].id,
        }
      }
    })

    console.log('topc', listTopicWithTeacherId)

    const newTopics = await Topic.create(listTopicWithTeacherId)

    const studentToAccount = listStudents.map((item) => {
      return {
        username: item.username,
        password: hashSyncFunction(item.password),
        role: 'student',
      }
    })

    const newAccountOfStudent = await Account.create(studentToAccount)

    const newStudentWithTopicIds = listStudents.map((item, index) => {
      if (newAccountOfStudent[index]) {
        return {
          ...item,
          selected_topic_id: newTopics[index].id ?? undefined,
          user_id: newAccountOfStudent[index].id,
        }
      }
    })

    await Student.create(newStudentWithTopicIds)
  } catch (error) {
    console.error(error)
    return
  }
}

export { createAdmin, initData }
