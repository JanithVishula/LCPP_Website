# 🎭 Dummy Users for LCPP Website

## Login Credentials

All users have the password: **`password123`**

### Test Accounts

| Name | Email | Role | Member # |
|------|-------|------|----------|
| Saman Perera | saman@lcpp.lk | **Admin** | LCPP-001 |
| Nimal Fernando | nimal@lcpp.lk | **Officer** | LCPP-002 |
| Kasun Silva | kasun@lcpp.lk | Member | LCPP-003 |
| Malini Jayawardena | malini@lcpp.lk | **Officer** | LCPP-004 |
| Dinesh Rajapaksa | dinesh@lcpp.lk | Member | LCPP-005 |
| Chamari Wijesinghe | chamari@lcpp.lk | Member | LCPP-006 |
| Tharindu Gunasekara | tharindu@lcpp.lk | Member | LCPP-007 |
| Anushka Mendis | anushka@lcpp.lk | Member | LCPP-008 |

## Quick Test

1. Go to http://localhost:3000/login
2. Login with any email above (e.g., `kasun@lcpp.lk`)
3. Password: `password123`
4. You'll be redirected to the dashboard

## Re-seed Database

To clear and recreate all dummy users:

```bash
npm run seed
```

## Features in Dashboard

- ✅ Real user data from MongoDB
- ✅ Dynamic stats (projects, hours, events)
- ✅ Upcoming events list
- ✅ Recent activities
- ✅ Member information display
- ✅ Role-based information
