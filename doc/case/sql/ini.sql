--- 添加角色
INSERT INTO case_rbac_role  (pid,`level`,`name`,description,`status`,is_open,path,client_id,admin_id,update_time,create_time)
VALUES(0,'1','超级管理员',1,1.0,1,UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()))


-- 添加角色
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,2);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,3);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,4);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,5);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,6);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,7);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,8);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,9);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,10);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,11);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,12);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,13);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,14);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,15);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,16);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,17);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,18);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,19);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,20);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,21);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,22);
INSERT INTO case_rbac_roletosource  (role_id,source_id)
VALUES(1,23);

-- 添加用户权限
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,1);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,2);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,3);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,4);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,5);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,6);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,7);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,8);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,9);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,10);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,11);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,12);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,13);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,14);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,15);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,16);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,17);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,18);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,19);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,20);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,21);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,22);
INSERT INTO case_rbac_admintosource  (admin_id,source_id)
VALUES(1,23);


-- 添加资源 case_rbac_source   模块 控制器 方法   level=0 是模块  level=1控制器 level=2 方法

--  添加案例模块
INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,update_time,create_time)
VALUES(1,1,0,0,'系统管理','system',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()))
INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,update_time,create_time)
VALUES(1,1,0,0,'案例管理','caseadmin',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()))


-- 添加角色管理
INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'角色管理','system','role',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(2,1,2,2,'角色列表','system','role','list','/system/role/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(2,1,0,2,'更新角色','system','role','update','/system/role/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(2,1,0,2,'新增角色','system','role','add','/system/role/add/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(2,1,0,2,'删除角色','system','role','delete','/system/role/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));


-- 添加资源 power

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'资源管理','system','power',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(7,1,2,2,'资源列表','system','power','list','/system/power/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(7,1,0,2,'资源角色','system','power','update','/system/power/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(7,1,0,2,'新增资源','system','power','add','/system/power/add/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(7,1,0,2,'删除资源','system','power','delete','/system/power/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));


-- 添加用户

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'用户管理','system','user',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(12,1,2,2,'用户列表','system','user','list','/system/user/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(12,1,0,2,'更新用户','system','user','update','/system/user/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(12,1,0,2,'新增用户','system','user','add','/system/user/add/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(12,1,0,2,'删除用户','system','user','delete','/system/user/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));


-- 添加用户角色

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'用户角色管理','system','userrole',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(17,1,2,2,'用户角色列表','system','userrole','list','/system/userrole/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(17,1,0,2,'更新用户角色','system','userrole','update','/system/userrole/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(17,1,0,2,'新增用户角色','system','userrole','add','/system/userrole/add/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(17,1,0,2,'删除用户角色','system','userrole','delete','/system/userrole/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));


-- 添加用户权限

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'用户权限色管理','system','userpower',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(22,1,2,2,'用户权限列表','system','userpower','list','/system/userpower/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(22,1,0,2,'更新用户权限','system','userpower','update','/system/userpower/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(22,1,0,2,'新增用户权限','system','userpower','add','/system/userpower/add/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(22,1,0,2,'删除用户权限','system','userpower','delete','/system/userpower/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));


-- 添加部门管理

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'部门管理','system','department',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(22,1,2,2,'部门列表','system','department','list','/system/department/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(22,1,0,2,'更新部门','system','department','update','/system/department/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(22,1,0,2,'新增部门','system','department','add','/system/department/add/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(22,1,0,2,'删除部门','system','department','delete','/system/department/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));




--   权限相关 end


--  业务相关 start


-- 添加广告控制器
INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'广告管理','caseadmin','ads',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(27,1,2,2,'广告列表','caseadmin','ads','list','/caseadmin/ads/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(27,1,0,2,'更新广告','caseadmin','ads','update','/caseadmin/ads/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(27,1,0,2,'新增广告','caseadmin','ads','add','/caseadmin/ads/add/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (`status`,is_show,`level`,pid,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(27,1,0,2,'删除广告','caseadmin','ads','delete','/caseadmin/ads/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));


-- 添加广告控制器
INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'广告位管理','caseadmin','adsplace',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(32,1,1,1,'广告位列表','caseadmin','adsplace','list','/caseadmin/adsplace/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(32,1,0,2,'更新广告位','caseadmin','adsplace','update','/caseadmin/adsplace/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(32,1,0,2,'新增广告位','caseadmin','adsplace','add','/caseadmin/ads/adsplace/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(32,1,0,2,'删除广告位','caseadmin','adsplace','delete','/caseadmin/adsplace/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));


-- 添加客户管理
-- pid= +5
--  status 是否可用 is_show 是否菜单显示
INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'客户管理','caseadmin','source',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(37,1,1,1,'客户列表','caseadmin','source','list','/caseadmin/source/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(37,1,0,2,'更新客户','caseadmin','source','update','/caseadmin/source/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(37,1,0,2,'新增客户','caseadmin','source','add','/caseadmin/source/add/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(37,1,0,2,'删除客户','caseadmin','source','delete','/caseadmin/source/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));


-- 添加案例管理
-- pid= +5
--  status 是否可用 is_show 是否菜单显示
INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'案例管理','caseadmin','act',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(42,1,1,1,'案例列表','caseadmin','act','list','/caseadmin/act/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(42,1,0,2,'更新案例','caseadmin','act','update','/caseadmin/act/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(42,1,0,2,'新增案例','caseadmin','act','add','/caseadmin/act/add/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(42,1,0,2,'删除案例','caseadmin','act','delete','/caseadmin/act/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));



-- 添加案例分类管理
-- pid= +5
--  status 是否可用 is_show 是否菜单显示
INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,update_time,create_time)
VALUES(1,1,1,1,'分类管理','caseadmin','category',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(47,1,1,1,'分类列表','caseadmin','category','list','/caseadmin/category/list/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(47,1,0,2,'更新分类','caseadmin','category','update','/caseadmin/category/update/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(47,1,0,2,'新增分类','caseadmin','category','add','/caseadmin/category/add/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));

INSERT INTO case_rbac_source  (pid,`status`,is_show,`level`,`name`,`module`,controller,`action`,url,update_time,create_time)
VALUES(47,1,0,2,'删除分类','caseadmin','category','delete','/caseadmin/category/delete/',UNIX_TIMESTAMP(CURRENT_TIMESTAMP()),UNIX_TIMESTAMP(CURRENT_TIMESTAMP()));
