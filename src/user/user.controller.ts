import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Req, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger/dist';
import * as svgCaptcha from 'svg-captcha'
@ApiTags('hello')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('code')
  createCode(@Req() req, @Res() res, ) {
    const Captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9944'
    })
    req.session.code = Captcha.text
    console.log(req.session.code)
    res.type('image/svg+xml')
    res.send(Captcha.data)
  }


  @Post('create')
  createUser(@Body() Body, @Req() req) {
    console.log(req.session.code)
    // if (session.code.toLocaleLowerCase() === Body?.code?.toLocaleLowerCase()) {
    //   return {
    //     code: 200,
    //     message: '验证码Ok'
    //   }
    // } else {
    //   return {
    //     code: 200,
    //     message: '验证码错误'
    //   }
    // }
  }

  @Get()
  findAll(@Query() query) {
    console.log(query)
    return {
      code: 200,
      messsage: query.name
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
function createCode() {
  throw new Error('Function not implemented.');
}

function create() {
  throw new Error('Function not implemented.');
}

function findAll() {
  throw new Error('Function not implemented.');
}

function findOne() {
  throw new Error('Function not implemented.');
}

function remove() {
  throw new Error('Function not implemented.');
}

