CREATE OR REPLACE FUNCTION add_user(pass_firstName varchar, pass_lastName varchar, pass_email varchar, pass_password varchar, pass_role varchar)
returns table(user_id uuid) as $$
    DECLARE
        image_user varchar := 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAD40lEQVRoQ+2Z209TQRDGv1JKKbdWoIKAxQsXiwgSi0FFowlRYtDog4+++KT+Qcb4ZHwyXqJRxGjUGBEvGCOKGgSNeKGU0lJbWkqptGaINZVCO3u6YDHd1zMz+/129jK7R2VzesP4D5oqDZJiWUxnJMUSgnRGOBn5anfB4fHBqM9FebEBGSoVx02RjfSM+KZn0NX7DuNu74KCTh/arUhoIidpIKFQGJ9tDtx5ORC3T41aja1VFWiuMSXSJvRdGsgn6zju9w3i52yIJaCmYjXammpZthwjKSAOtxeXHr3i9PfHRqvJxAGLGRXFBiG/xYylgJztfIxQWLzSWWs04FDLltQAeTs8ikf9HxWLkbX4k87IwzdDeP/FphjkeFsz8nXZiv0jjv8cpKyoAEd2Nq58kOwsDU4caFn5IE1V5dhh3rDyQVJmsVsdblx/+kbRiFLtdbKjVZHvfKekFzsFPHurB6EQ70SPFmCpMWF7bWXqgJCSC/d64fUH2KJys7NwcPtmGPV5bJ94hlIyQh3Yf0zi9ov3oOqX09otddiwpohjyrKRBkK9UZlC5Uq8RjXW0V2NKMzPYQnkGkkFoU4DwZ/o/2yFdzqAMdfk3HTL12lRrM9DRoYKexuqudqE7JICIZFUovgDQRzb0xTTsW86gJngLLI0auRos6CKuiG6fX48+F32H9nZAE2mWki4lF3LPxPEjaf9cHp8f+KtKylEc21lwsUbDofh8vpx8eHLv7S01m+EyWiAIU/ZlFOUkWs9rzE64YkZQXWGCpvWlqK63IiyIn3M9y/2CXy0OjBsc85NwflNp9Wg3WLGmsJY30TpEgY5c7M7UcykvtO5QueLaBMCGfxux71XH0T7ELY/1dH613riBBACSfbuwRFENnRILrR5xPNngzg8Xlzt7sNsSPxKywWIthMtJhcEoZ0lequkDuid6rLgA4MSgIjP/m2bUFVmZIdgZ4RKkCvdfezAyRrWVZYKHZ5skPN3n2EqEExWH9t/yUCWetudT2g2lWJfI7+cYWdkuUH0uTocbqlHfg7vhSVlQShDtAVz7yssEHrPPdfVw57fsgylg5CwyalpdD5/B5d3SpbOuHFW5eWgg6aWTsvqj5WRSKRJf2AO6PoTZY8NLEUA6K2LssGFoLhCIBEhI043egeGYXN5oODtelEeunxZqk2KrsCKQCJKBr6Nwep0Y+DbGNUtiv6rhYFwWWGBqraiBGZTiXCxGNGSFEj00A6NjM/d+GYFnoXorxVdxmQ0aSARMVSn2SY8GByxY6Hykn7srC8tBl3CZDbpIDLFicRKg4iM1nLYpjOyHKMs0sd/k5Ffnh7yUtg80EIAAAAASUVORK5CYII=';
    BEGIN
        INSERT INTO users(id, first_name, last_name, email, password, image, role, confirmed)
        VALUES(uuid_generate_v4(), pass_firstName, pass_lastName, pass_email, md5(pass_password), image_user, pass_role, false);

        return query SELECT id FROM users WHERE email = pass_email;
    END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_user_bio(pass_userId uuid, pass_phone varchar, pass_addressMain varchar, pass_addressCity varchar, pass_addressZip varchar, pass_addressCountry varchar, pass_dateBirth date, pass_gender varchar)
returns void as $$
    DECLARE
        image_user varchar := 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAi4AAAIuCAYAAACYSoPfAAAgAElEQVR4Xu3d55sc13nn/Xu6J+ecMDPAIOdAAkxiECmRCrYlK62stXZl7+6b5/mDnjePd/eSJVtrW7YkW5YsiZRIMQIgCBCByMBgcs6pp8PsdZ+ZIQkQoae7q7rqnG9dHveQ6qo69+cuEj9WOFUgIjI8Mb+qnywIIIAAAggggECQBQoILkFuT/7HponWHCQsCCCAAAIIBECA4BKAJgR5CASXIHeHsSGAAALuCRBc3Os5FSOAAAIIIBBaAYJLaFvHwBFAAAEEEHBPgODiXs+pGAEEEEAAgdAKEFxC2zpvB869Ld76snUEEEAAgcwECC6ZuVm/VqbBJdP1rAelQAQQQACBnAgQXHLCGM6NeBEyvNhmOHUZNQIIIICAFwIEFy9UQ7JNQkZIGsUwEUAAAQQ+FiC4cDAggAACCCCAQGgECC6haRUDRQABBBBAAAGCC8cAAggggAACCIRGgOASmlYxUAQQQAABBBAguHAM5FyAm35zTsoGEUAAAQTWBQguFh8K+QoQ+dqvxa2kNAQQQAABgov9xwABwv4eUyECCCDgmgBnXCzsOIHFwqZSEgIIIICAESC4WHggEFwsbColIYAAAggQXDgGEEAAAQQQQCBcApxxCVe/GC0CCCCAAAJOCxBcnG4/xSOAAAIIIBAuAYJLuPrl+2g/fb/M/e6d0b+nizmQWBBAAAEEEPBYgODiMXC2m8/3jbYEl2w7yPoIIIAAArkUILjkUtODbeU7uHhQEptEAAEEEEAgYwGCS8Z0+VnxUWdA7jeqR4WfR/3v+amUvSKAAAIIIPBZAYJLyI4KgkvIGsZwEUAAAQRyKkBwySknG0MAAQQQQAABLwUILl7qZrhtLt1kCMdqCCCAAALWCxBcAtjibINLtusHkIQhIYAAAgggYAQILnk6ELwMF15uO09c7BYBBBBAAAGCSz6PAcJFPvXZNwIIIIBAWAU44xLWzjFuBBBAAAEEHBQguDjYdEpGAAEEEEAgrAIEl7B2jnEjgAACCCDgoADBxbGmc2+NYw2nXAQQQMAyAYKLZQ3dKOdBAYXgYmnDKQsBBBBwRIDgYmmjCSiWNpayEEAAAccFCC6OHwCUjwACCCCAQJgECC5h6hZjRQABBBBAwHEBgksIDwAuA4WwaQwZAQQQQCAnAgSXnDD6uxGCi7/e7A0BBBBAIDgCBJfg9IKRIIAAAggggMAjBAguATpEOJMSoGYwFAQQQACBQAoQXALUFoJLgJrBUBBAAAEEAilAcAlkW+4dFJEmFG1ikAgggAACngsQXDwnzsUOHh1cHv2NXIyDbSCAAAIIIJBfAYJLfv1ztneCS84o2RACCCCAQIAFCC4Bbg5DQwABBBBAAIG7BQguHBEIIIAAAgggEBoBgktoWsVAEUAAAQQQQIDgwjGAAAIIIIAAAqERILiEplUMFAEEEEDAfwEeffDf/OF7JLgErSOMBwEEEEAgQAIElwA1wwyF4BK0jtw1Hv6BCXR7GBwCCCCAgO8CBBffyTezQ4LLZrT4LgIIIICA/QIEF/t7TIUIIIAAAghYI0BwsaaVFIIAAggggID9AgQX+3tMhQgggAACCFgjQHCxppUUggACCCCAgP0CBBf7e0yFCCCAAAIIWCNAcLGmlRSCAAIIIICA/QIEF/t7TIUIIIAAAghYI0BwsaaVFIIAAggggID9AgQX+3tMhQgggAACCFgjQHCxppUUgkBuBVKrq5JIpiSRTEoikZR4KiXJZEpWV1cltSrrn6vmvSEFBQUSKShY+4wUSGEkIoWFESmMRqUwGpGiaDS3g2NrCCDgrADBxdnWUzgCawKxeEIWl1dkaSVufjc/KwlZjifWQst6eIknU5JMpWQ1tSopWV37XF01YeWT4CImwGwEFg0t+ntxYVRKigrNT2nx2mdZSbGUlxSbYMOCAAIIpCtAcElXiu8hYIGABpG5pZjMLcZkMbZiAov5jMXXg0vchBYNLyuJZM4q1jBTvBFc1j/LSoqkvHQtvOhPRWmxVJeXmr+n32dBAAEE7idAcOG4QMBigVRqVWaXlmVmYcmElbnF5bXgshSTxWUNL3FzFiWfi56N0bBSUVoi1eUlUllWKtVlJVJVXio1FWUm0LAggAACGwIEF44FBCwTiCeSMr2wJNPz+rNofp9ZWDahRS8HBX3Re2QqS0ukqqxEairLpFZ/KsrNp56R4WxM0DvI+BDwVoDg4q0vW0fAF4FkatWElInZBfMztR5YZheWzX0oYV6Ki6JSU64Bplzqq8qlobpCGqsrpLKsJMxlMXYEEMhQgOCSIRyrIRAEgYXlFRmdnpNxE1jmTWjRsBLuqPJgWb3Rt66yTBprKqShqkIaayqlqaZSigp5aikIxyNjQMAPAYKLH8rsA4EcCugZlMnZRRmdnpXR6XkTXCbnF0XvZ3Fp0SeT9MxLS12VNNVWSUttFWdhXDoAqNVZAYKLs62n8LAJ6BwqozPzMjQ5KyNTGlrmRM+4uL7oPS96GamlrtKEl/aGGvPXLAggYKcAwcXOvlKVRQL6CPPw1JwMTczK0OSMjEzNSTyZu0eVLaIyTyC119dIW0ONtNVXS31VhfBktU0dphYExEx6KcMT826dY6bzCIRAQB9T1pDSNzYlg5OzMjo1l/dHl0PAZoao88K01lfJloZa6Wyq5QxMWBrHOBFIQ4DgkgYSX0HATwF9CGh8Zl56x6akf2xKhqZmnbt/JVfeOsldR0OtdDRpgKnjHphcwbIdBPIoQHDJIz67RuBeAZ1rpWdk0pxlGZiYEZ2ThSV7AZ0TpqOpTrqa66SrqY6nkLInZQsI5E2A4JI3enaMwCcCGlD6xqekZ3hS7oxMhmKiuDD2T+956W6tl20tDdJcW8X9L2FsImN2XoDg4vwhAEC+BcZm5uXW0Lg506LzsLB4KxCNRmRLQ40JL9vbGsz9MCwIIBAeAYJLeHrFSC0T0JcY9gxPyI3BMekbm+bGW5/7q+9H2t7aIDvbm6StvoazLz77szsEMhUguGQqx3oIZCGgZ1Y0sOiPvkeIJT8CBQUF0l5fLbu2NEt3W4OUFRflZyDsFQEE0hYguKRNxRcRyF5A3ynUOzohV/tH5c7IFGdZsifNyRb0vUc72hpkT0eLeY0ACwIIBFeA4BLc3jAyywSWYnG5NjAmV/uGzbuFWIIlEI0USFdzveztbJGtzfWib6lmQQCB4AkQXILXE0ZkoYBeGrrSNyLX+kd5Yijg/dUXOO7taJXdHU1SyqWjgHeL4bkoQHBxsevU7KtA//i0XOwZNE8NufYiRF+hc7gzfdJod0ezHNzWJtXlpTncMptCAIFsBQgu2QqyPgIPENAp+28NTZjQoi9GZAmXQGE0Yp440vCic76wIIBAMAQILsHoA6OwTEAfdb7SOywX7wzJ9PySZdW5U44+daQz7R7qbpPO5vq1l7uxIIBAXgUILnnlZ+c2CiyvxOViz5Bc6BkUvSGXJfwCLXVVcnR7h5mwTsMMCwII5E+A4JI/e/ZsocDi8oqcvz0ol3qGJJZIWFihuyU1VFXIkZ1bZFd7k0QjEXchqByBPAsQXPLcAHZvj8DcUkw+vNkvl3tHJJ7k5Yj2dPaTSmoqSuXI9i2yr6uV8GJjg6kpFAIEl1C0iUEGXWB+KSZnrvfJlb5h0UnmWOwV0Mnqju3skP2draLvPWJBAAF/BQgu/nqzNwsFTGi50SeXe4d53NnC/t6vJBNednTI/q2ceXGk5ZQZIAGCS4CawVDCJ7CwvCJnrvfKR4SW8DUvyxFreHlsZ6fs62rhslGWlqyOwGYECC6b0eK7CHxKQJ8eev9an1y6M8jlIUePDA0vJ3Z3mdcE8LSRowcBZfsuQHDxnZwd2iAQTyTl7I1+OXerXxLJlA0lUUOGAjUVZfLUvm2yo60xwy2wGgIIbEaA4LIZLb6LgIgkkyk53zMoH1zr45FnjggjoO83emZft3Q01SGCAAIeC1gbXPS5DqaJ8vjocXDzelxduTMsJ6/2yCKTyzl4BDy45Lb6ann24A5pqqnEBQEEPBQguHiIy6btE+gdm5I3z9+QmcVl+4qjoqwFulsb5LmDO0TvfWFBAAFvBKwNLt5wsVWXBSZmF+SN89dleGrOZQZqf4hApKDAvJTxib1bpbiwECsEEPBAgODiASqbtE9AH3t+++JNuTE0bl9xVJRTgaLCqBzf3WVm2NUgw4IAArkVILjk1pOtWSigN+OeunpHPrw1IKlVZsW1sMU5L6mitFieP7RT9NIRCwII5FaA4JJbT7ZmocC1/lF58+JNicV5aaKF7fWspObaKvnC0d1SV1Xu2T7YMAIuChBcXOw6NactMDY9L6+duyqTc4tpr8MXEdgQ2NPRbJ40KinifheOCgRyJUBwyZUk27FOQGfGff3D63JreMK62ijIH4FoJGJu1D26o4PpGfwhZy8OCBBcHGgyJW5eQO9kOXujT05ducN9LZvnY41PCeij0S8/tld0nhcWBBDIXoDgkr0hW7BQYGhyVn575rLo00QsCGQrsLW5Xl46tlvKiouy3RTrI+C8AMHF+UMAgHsFlmJxc19L7+gUOAjkREAfi9ZLRsd2dApPSOeElI04LEBwcbj5lH5/AX154skrPVwi4gDJqYBeMnrl8b3SWsclo5zCsjHnBAguzrWcgh8mMD6zIL86fUnml2JAIZBzAZ3X5YvH9ohOUseCAAKZCRBcMnNjLQsFkqmU/OHcdbk2MGphdZQUBAF9yujzR3bKno6WIAyHMSAQSgGCSyjbxqC9ELg1PC6vfnBNEsmkF5tnmwgYgYbqCvnqif1SVV6KCAIIZCBAcMkAjVXsE1haicuvTl2SEV6gaF9zA1jRYzs75al92wI4MoaEQPAFCC7B7xEj9EHgwu1BM60/CwJ+COi7jP70yYPm7AsLAghsToDgsjkvvm2hgN6I+6/vXZDp+SULq6OkoArs72qV5w/v5A3SQW0Q4wqsAMElsK1hYH4JnL52R05f7fVrd+wHASOg7y/66hMHmFGX4wGBTQoQXDYJxtftEphZWJZfvHuex5/tamtoqtnR3mheB6AT1LEggEB6AgSX9Jz4lqUCJy/fkTM3ONtiaXsDX5bO56L3uvAeo8C3igEGSIDgEqBmMBR/BeaWluVnb3O2xV919navwK72JvniY3ukgLMuHBwIpCVAcEmLiS/ZKHDmeq+cvHLHxtKoKUQCxYWF8rWnD0lzbWWIRs1QEcifAMElf/bsOY8Ci7EV+Ze3PpTZxeU8joJdI7AmsK+rVV48sgsOBBBIQ4DgkgYSX7FP4KM7w/L6+ev2FUZFoRQoKy6Sbz17RKorykI5fgaNgJ8CBBc/tdlXIAR0Sv+fv3NBRqfnAjEeBoGACjy5d6s8vqsLDAQQeIQAwYVDxDmBvvEp+ff3LklqddW52ik4uAJ1lWXyzWePmvldWBBA4MECBBeODucEfnPmstwcHHeubgoOtoD+y/jlx/fKzvamYA+U0SGQZwGCS54bwO79FZhbXJZ//ONZicUT/u6YvSGQhkBXc538yRMHhSej08DiK84KEFycbb2bhZ+/PSBvXbzlZvFUHXgBnZDuO88dk9pKbtINfLMYYN4ECC55o2fHfgskU6vy83c+lJEpbsr12579pS/w9L5uObazI/0V+CYCjgkQXBxruMvljk7Py7+8fU5SKW7Kdfk4CHrtTdWV8s3njkg0Egn6UBkfAnkRILjkhZ2d5kPgvcu35YMb/fnYNftEIG0BfeHiN589Is21VWmvwxcRcEmA4OJStx2uNZlKyT+9cVYm5xcdVqD0sAjofC46rwsLAgh8VoDgwlHhhMDYzLz885vnmLvFiW6Hv8jG6gr59nPHJBIx/4pmQQCBTwkQXDgcnBA4fa1XTl/lhYpONNuCIqORAhNcGqorLKiGEhDIrQDBJbeebC2AAjpB7k/fPCdjMzxNFMD2MKQHCDy9v1uO7eDpIg4QBO4VILhwTFgvML8Uk7/7/fui97mwIBAWgS2NNfL1pw+HZbiMEwHfBAguvlGzo3wJXOsflVfPXs3X7tkvAhkJFBdF5fsvnZDS4qKM1mclBGwVILjY2lnq+ljg9+euyZW+EUQQCJ3Anzx5QLY214du3AwYAS8FCC5e6rLtvAvo5aGf/OGMzC4u530sDACBzQoc2b5FPndg+2ZX4/sIWC1AcLG6vRQ3Nb8o/+cPZ4S5cjkWwijQVFMp33n+WBiHzpgR8EyA4OIZLRsOgoBeItJLRSwIhFGgKBqV//JF7nMJY+8Ys3cCBBfvbNlyAATeuHBDLvUMBWAkDAGBzAT+/JnD0t5Qk9nKrIWAhQIEFwubSkmfCPzjH8/K+Mw8JAiEVoD5XELbOgbukQDBxSNYNpt/gVg8IT/83SlJJJP5HwwjQCBDge1tjfLl4/syXJvVELBPgOBiX0+paF1gdHrOzJjLgkCYBaorSs18LiwIILAmQHDhSLBWgBtzrW2tU4VFIxH5q1eelJKiQqfqplgEHiRAcLH02NDHf11/r+w7H92SczcHLO0wZbkk8O3nj0pzTZVLJVMrAg8UILhYenAQXER+efKi9I5OWdphynJJ4KVju2VvR4tLJVMrAgQXjgH3BH706imZW4q5VzgVWydwbGeHPL2v27q6KAiBTAQ445KJGusEXkCfJPqb/3hXUinmzA18sxjgIwV2tDXKl3iy6JFOfMENAYKLG312rkp9N9GPXzvtXN0UbKdAc22VfPu5o3YWR1UIbFKA4LJJML4eDoGB8Rn5xbvnwzFYRonAIwTKSorkr195CicEEOBxaI4BWwV4FNrWzrpZV6SgQP77l5+WosKomwBUjcCnBDjjwuFgpcCZ671y8sodK2ujKDcF/vKl41JTUeZm8VSNAMGFY8B2gbcu3pTztwdtL5P6HBL45ueOSGt9tUMVUyoC9xfgjAtHhpUCr35wVa4NjFpZG0W5KfDVJ/bLtpYGN4un6rwJBHFOMIJL3g4HduylwC9PXpLe0Ukvd8G2EfBV4KWju2VvJ5PQ+YrOzoTgwkGAgE8C//zWORmZmvNpb+wGAe8FPndguxzZvsX7HbEHBAIuwBmXgDconeEFMRGnM24vv/P3f3hfpueXvNwF20bAV4ETu7vkxJ6tvu6TnSHglUA2f24RXLzqio/bzeYA8HGYvu7qR6+dkrlFpvv3FZ2deSpwbEeHPL2faf89RWbjvglk8+cWwcW3NrEjPwV++LuTsrC84ucu2RcCngoc3r5Fnj2w3dN9sHEEwiBAcAlDlxjjpgX+13+8J8vx+KbXYwUEgipwcFubPH9oZ1CHx7gQ8E2A4OIbNTvyU+BvfvWOrCSTfu6SfSHgqcC+rlZ58cguT/fBxhEIgwDBJQxdYoybFvj/f/W2xJOpTa/HCggEVWBfV4u8eGR3UIfHuBDwTYDg4hs1O/JT4G9+/Y6sJDjj4qc5+/JWYP/WVvn8Yc64eKvM1sMgQHAJQ5cY46YF/tdv3pXllcSm12MFBIIqcGhbuzx3aEdQh8e4EPBNgODiGzU78lOAp4r81GZffgjo5HM6CR0LAq4LEFxcPwIsrf/Hr52W2cVlS6ujLBcFHtvZKU/t2+Zi6dTss0A2c6z4MVSCix/K7MN3gZ+8fkam5hZ93y87RMArgSf2bJXju7u82jzbReBjAYILBwMCeRD4l7c/lOHJ2TzsmV0i4I3Aswd3yOHudm82zlYRCJEAZ1xC1CyGmr7Ar059JD0jE+mvwDcRCLjAF4/tkd0dzQEfJcNDwHsBgov3xuwhDwKvnb0mV/tH8rBndomANwJ/+uQB6Wqu92bjbBWBEAkQXELULIaavsDbl27Jh7cG0l+BbyIQcIFvPXtUWuqqAj5KhoeA9wJ5Ci5Bv/XHe3j24K3ABzf65L3LPd7uhK0j4KPA979wQqrLS33cI7tCIJgCBJdg9oVRZSlwbWBMXv3gSpZbYXUEgiEQjRTIf//yM1IYjQRjQIwCgTwK5Cm45LFidu2EwNDkrPzs7Q+dqJUi7ReoKC2WH7z8pP2FUiECaQgQXNJA4ivhE5hfisnfvnoqfANnxAjcR6Clrlq+9ewRbBBAQEQILhwGVgokUyn5n//xriR4Q7SV/XWtqJ3tTfLK43tdK5t6EbivQIiDCzf4ckw/XODvfv++zCwswYRA6AWO7+qSJ/ZuDX0dFIBALgQILrlQZBuBFPj1qY/kNpPQBbI3DGpzAi8/tkd2bWHyuc2p8W1bBUIcXGxtCXXlSuDk5R45c6MvV5tjOwjkTeC7LzwmDdUVeds/O0YgSAIElyB1g7HkVOB6/6j87uzVnG6TjSHgt4A+Av3XrzwlRYVRv3fN/hAIpADBJZBtYVC5EJiYnZd/eONsLjbFNhDIm0BdZbl878XH87Z/doxA0AQILkHrCOPJmUA8kTSPRMfiiZxtkw0h4LfA7i3N8sXH9vi9W/aHQGAFCC6BbQ0Dy4XAz976UIamZnOxKbaBQF4Enju4Qw51t+dl3+wUgSAKEFyC2BXGlDOBdy7dknO8bDFnnmzIf4FvP3tUmnm5ov/w7DGwAgSXwLaGgeVC4ObgmPzmDO8syoUl2/BfoLgoKj/44pPcmOs/vZN7DMvsaAQXJw9Pd4qeW1yWv//9+5Jc1X8kWRAIl0BbfbV843NM9R+uroV3tASX8PaOkVskkFpdlX98/QOZnF+0qCpKcUXg8V1d8iQz5rrSbupMU4AzLmlC8bXwCvzxwg252DMU3gIYubMCf/7MYWlvqHG2fgpH4H4CBBeOC+sFbg+Py69PX7a+Tgq0S6C0uEi+/4UTUszEc3Y1lmqyFiC4ZE3IBoIusBhbEX3hos7rwoJAWAS2ttTLnzxxICzDZZwI+CaQh+ASltt/fOsBO/JB4OfvnJfBiRkf9sQuEMiNwAuHdsqBbW252RhbQcAiAYKLRc2klAcLfHhrQN6+dAsiBEIhUBiNyl98/jGpLi8NxXgZJAJ+CuQhuPhZnj/74hySP87Z7GV6YUn+4fUPJJlKZbMZ1kXAF4HWumr5xrOHpUDMv6JZEEDgUwIElxwcDgSXHCB6vInV1VX557c+lNHpOY/3xOYRyF7g6X3b5NjOzuw3xBYQsFCA4GJhUynp/gIfXO+T9670wINAoAUKIxH59vPHpL6qPNDjZHAI5EsgpMGFcxz5OmDCvN+p+UX56ZvneLoozE10YOxtddXy9c8dlkgBl4kcaDclZiBAcMkAjVXCKaCXi/7t5CXpH5sKZwGM2gmB5w/tlIM8TeRErykyM4GQBpeNYjnzklnb3V3rSt+I/P7cNXcBqDzQAjrp3H964ZhUlpYEepwMDoF8ChBc8qnPvn0X0Mno/vGNs6KfLAgETWBHe5N86fG9QRsW40EgUAIhDy6BsmQwIRF44/x1uXRnOCSjZZiuCOg9LV998oB0NdW5UjJ1IpCRAMElIzZWCrPAyNSc/OLdC5JI8gqAMPfRtrE31VbKN545IoXRiG2lUQ8CORUguOSUk42FQSCVWpV/P3lJ+sa5STcM/XJljNyU60qnqTNbAYJLtoKsH0qBG4Nj8rszV0Rv72ZBIN8ClWUl8q1nj0pFaXG+h8L+EQi8AMEl8C1igF4IxOIJ0RcvTswueLF5tonApgSO7eiQp/d3b2odvoyAqwIEF1c7T91ysWdI/njhBhII5FWgrKRYvvHMYamtLMvrONg5AmERILiEpVOMM+cCS7EV+fm7F2RqbjHn22aDCKQrcHBbuzx/aEe6X+d7CDgvQHBx/hBwG+DDWwPy9qVbbiNQfd4EdMK5rz9zWBp4L1HeesCOwydAcAlfzxhxDgUWllfkX9/jrEsOSdnUJgT2b22TFw7vFN5KtAk0vuq8AMHF+UMAgAs9g/LWhZs8YcSh4KuAPkH0Z08d4i3QvqqzMxsECC42dJEashJYXonLL09ektHpuay2w8oIbEbgsZ2d8tS+bZtZhe8igIDI2hnK4Yl5prPgcHBa4Hr/qHn5YnKVfxScPhB8Kr6moky+9tRBqSov9WmP7AYBewQILvb0kkqyEIgnkvKbM5eld5TZdLNgZNU0BAoKCuSZ/d1yZPuWNL7NVxBA4F4BgovPx4T+9zw34vmMnubuBsZnTHjRS0csCHgl0F5fI186sU/Kiou82gXbRcBqAV+DC39oi7kBlOASzH+mUqur8u5Ht0UfkWZBwAuB4qKovHxsr2xtqfdi82wTAScECC5OtJki0xWYWViWX5++JJNMSpcuGd/bhMC+rS3ywsFdEonwny+bYOOrCNwl4GtwwR6BMAhc7huRNy/clEQyGYbhMsaQCNRWlsuXT+yT+srykIyYYSIQTAGCSzD7wqjyKKA36uo7jK72j+ZxFOzaJoHCaFSeO7hd9nW12lQWtSCQFwGCS17Y2WnQBfSt0b89c0Wm5nmPUdB7FYbx7eloNjPkaoBhQQCB7AQILtn5sbbFApd7h+Wti7ckziUji7vsfWl1VeXypcf3Sn1Vhfc7Yw8IOCBAcHGgyZSYmYBeMnrno9ty6c5QZhtgLecFSooK5dmDO0TPuLAggEBuBAguuXFkK5YKzCwsyWvnrsnw5KylFVKWVwI60dyR7e3y5N5tEo1EvNoN20UgMAJ+TfdBcAlMyxlIUAV6Ryfl9fM3ZH4pFtQhMq4ACnQ21cmLR3dJZWlJAEfHkBDIvQDBJfembBGBjARWV1flw9uDcvrKHe53yUjQvZVqK8vkxSO7pa2+2r3iqRgBjwU44+IxsG7erxTqQynO7iIWT8jJKz1yqWfI9JMFgQcJ6FT+T+/vlr2dLSAhgIAHAgQXD1Dv3STBxQdkH3Yxu7hsnjLqGZnwYW/sIowChZGIPLarU47t7JQos+OGsYWMOQQCBJcQNIkhBkdgdHpO3jh/Q8Zm5oMzKEYSCIGCApF9na3mbIs+TcSCAALeCBBcvHFlqxYL3B6eMC9jnF5YsrhKStusQHdrg3zuwHapLi/d7Kp8HywjHKoAACAASURBVAEENiFAcNkEFl9FQAX0Zl19HcCpq3d40ohDwghsaayVz+3vlsaaSkQQQMBjAYKLx8Bs3k6BZGrVTEz3/rVeWV6J21kkVaUl0FxbJc/s75b2hpq0vs+XEEAgOwGCS3Z+rO2wgL4K4PytQTl3s1/0qSMW9wQaqivMBHPbWurdK56KEciTAMElT/Ds1g4BDSznbw+YAEN4saOn6Vah7x46sWerbG9rEPMvUhYEEPBFgODiCzM7sVnAhJdbA/Lh7QFZiSdtLpXa1gXqq8rl+O6tsqO9kdDCUYGAzwIEF5/B2Z2dAhpePrw1IBduc+bFzg5/UlVDVYU8vrtzPbRwrsX2flNf8AQILsHrCSMKqUBsJSEXe4bkQs+gLMZWQloFw36YgN6Ie2xnx/rlIUILRwsC+RAguORDnX1aK7CSSMrl3mFz9oWXMtrVZn1qSENLV3M9l4fsai3VhEyA4OJhw5jq30PcAG86kUzJlf5Rc9/L9PxigEfK0NIRKCgokK7mOjm6o0O28MhzOmR8BwFPBQguHvISXDzEDfimdZ6XW8PjcvH2oAxNzgZ8tAzvQQL67qGdW5rk4LZ2aa5lcjmOFAQeJeDHn3sEl0d1gf8dgQwF9B/ggfFpuXh7SHpGxiXFa6UzlMzPaqXFRbKvs0UObGtjGv/8tIC9hlCA4BLCpjFkBO4VGJ9ZMLPsXh8Yk5UEE9WF4QiprSyTfV2tJrhogGFBAIHgCHDGJTi9YCQWC+iNuvp+o6t9I7ycMcB91vtZOhprZW9ni3lyKBqJBHi0DA0BNwUILm72narzIJBIJkXfLH25b1QGxqaEK0d5aMJDdllcFJWd7U0mtLTWVQdrcIwGAQQ+FiC4cDAg4LOA3qx7rX9Ubg2NyxIvaPRZ//6703cO6U24ezqapbK0JBBjYhAIIHB/AYILRwYCeRBYWF6Rm0PjcmNwTEYmZzn7koce6C6LolHZ2lJvzrRsbanj0lCe+sBuEdiMAMFlM1p8F4EcCqRWV81TRxpeeoYnOfuSQ9t0NqVT9+t9LHqmpa6yPJ1V+A4CCARAgOASgCYwBLcF5paW5fbwpPQMT8jQxIwkV7n7xcsjQp8S2tpcJ92tDdLZXGfOurAggEB4BAgu4ekVI7VYQM++jEzNSc/IhAkxzLib+2ZHIwXSWl8j21oapLu1nrlZck/MFhHwRYDg4gszO0EgPQF9y3Tv2JT0jU5J//g07ztKj+2h3yooEGmsrpTOpjozdX9bfbXoY88sCCAQTgGCSzj7xqgtF5hbXDbBpW9s2nwu8/RRRh2vrSyXzqZaE1r0PUNFhVwWygiSlRAIkADBJUDNYCgI3CswNbcofePT5t6XwclZWYqtgJSGQF1VubTX10h7Y410NtYy+20aZnwFgbAIEFzC0inG6ayA3qs7Nb8ggxOzMjQ5Y17aqDPxstwtoJd/GqrKpa2+RtoaaqS9oVrKS4phQgABywQILpY1lHLsFpieXzLhRW/kHZ2Zk8nZBedf3qgz3jbVVElzbZW01lWZe1h4v5Dd/xxQndsCBBe3+0/1IRVYWI7J6PS8jEzPydj0vIzPzstSLB7SajY/bL23trq8TJpqKqW5rlKaa6qkqbZKiqK8W2jzmqyBQLgECC7h6hejReAugXgyKROzC6JvoNZP8zO3IPFE0kqpitJi0en5zU9VhQkutVVlUiA8JWRlwykKgfsIEFw4LBCwRGBxeUUm5hZNcNGbenUumOmFpVCfidH7VqrKSqS2skz0CaH6qnITWOqry5k4zpLjljIQ2KwAwWWzYnwfgYAL6Ly7C0sx0fthNLjo58zikugj1nNLscCfjSkrKTZhpaq8RGor1gLL2meZlBQVBlyf4SGAgNcCBBevhdk+AnkWiK0k1oLLUkzmFmOirxjQ3/UMzWJsRZaWV/L2mgGdV0Wf/CkvKTJvZa4sL5GqslITWqrKS6WmvJQXH+b5+GH3CORSQP/DKtsLuwSXXHaEbSEQAgGdzO7TwWUxFjchZmklLjpzr/4sxxOyEk+YszPJVCrjqvRfMIXRqJn4Tc+WmJ/iQiktKpKykqKPQ0t5afFacCkrkUJusM3YmxURCLoAwSXoHWJ8CIRAQOeJicXjnwSXlU8Fl2RSEsmUJBIpiaeSkkymZHV1VfTdSvqj62o40XtR9CdSIBKJRKRQfwoja6ElGvlUcCky4aW0qNAEF2ayDcEBwhARCJgAZ1wC1hCGg0DQBDSgaGCJJ1OSTCVNWEmlViUlGlxW7wkuGl4KzFkTDS3RaCTr08JB82A8CCCQXwGCS3792XueBfSyyOzCsswuLpuZVvXGUBYEvBbQ+XeWY3GpqdD7ebiPx2tvtm+XAMHFrn5SzSMEkqlVmVtckpmFZZlZXJbZhSUTWvRna3OdHNvZyayrHEWeCoxOz8mpq3dkeSVhbj6uriiVar0RuaLM/OhcNSwIIPBgAYILR4f1AnqD6dpjwYsypY8Grz8erOFFz7hsLHq/xeHudjm6o4PHbq0/KvJToE4UePJqj9wZmfx4AHpvkIYVDTEaXDbmrKmrLDNnY/TSGwsCCHwiQHDhaLBSYCWelMn5BZmcW5SZ9cCi85nomRW9Z+NBi7735sj2LXKku0P0dxYEciUwObcgp67ckVvDEw/dZHFh1ASYOp2/xky8Vyb1VRVmLpuI3v3MgoDjAgQXxw8Am8rX6e91xlgNKzr1vf5BMTm3JPpen80s+tTL0e0dcrC7jTMvm4Hjuw8U0GPx/Wu9cmNwfFNK0UjEXEqq11mDzWsO1j717IyeqWFBwEUBgouLXbeoZn2qZWZhScZmFsyLBjW06BuTdZ6SbBZ9u/ChbW1yqLude16ygWRdGZuZlw9u9MmtwXF58Lm+R0NpiNk4+9JQXS6N1ZXSVFPBDeWPpuMblgkQXCxrqCvl6CRq4zPz5g8FvW9gbHbe3LuSzR8M99rpmZf9W9vkyPZ2M1EaCwKbFRiZmpUz1/ulZ+Thl4c2u1191FzDi75ksrG6QhprKs07nPTxcxYEgiiQi4nnNuoiuASxw4zpgQJ6k+3I1JzokxkaXPRH5xfxatEbdvd3tZr7XnRWVxYE0hUYnJiRD673Se/YVLqrZPQ9vbFXg4uGmJbaKmmpq+IsYUaSrOSlAMHFS122HTgBnXJez6poWBmemhP9r1i9ydavRSdT29vRIoe2t5sbJlkQeJiAXr68MzolH97sl4GJGd+w9FJSQ3WFtNRWSktdtQkwepMvCwK2CXDGxbaOWlSPTjWvZ1eGJmdkeGrWBBed+yIfSzRSINtbG014aa2rzscQ2GcIBHSG4euDY3Lh9qC5jJmvRW/ebamvNsdqW0O1eSqJW3nz1Q32m2sBgkuuRdle1gI674qeVRmcnBU93T46NSeJLF70l/WA1jeg/7B0NNXKoe4tZrI6nurIlawd29E5ga70jsiFnkFfzwg+TE/vzWqtr5b2hhppr682Z2Q4bu043sJURS4vE2ndBJcwdd/ysep/rQ5NzUr/+LQMTcyITouu78QJ2tJUWymHtrXLzvZG8z4eFgTml2Jy6c6wfHRnyLysMmiLPiXXth5gNHzrjbwsCPglQHDxS5r9+CagE8KNTc9J39i09I1Pm7MtQQwsnwapriiTfZ3NsrezlSnafTtSgrkjPV4v947ItYExSSSTwRzk+qg0wOjZl86mWulsrBU9jlkQCJsAZ1zC1jHLxqvT8PeMTEn/2JQMTs6I3tcSlkUfl97Z3iT7ulqkubYqLMNmnDkS0JvGe4Yn5XLfsPSNTuX0UfwcDfGBm9EnkToaa6WzqU66mut4CslrcLafUwGCS0452Vi6AjoPS+/olHlniz4u+ul3BqW7jSB8T98j09lcZ8LL1uYG0Zt4WewXWIrF5drAqFzuHTaTHoZ10bdTb2upl60tDdJWX8PxG9ZGBnjcub5MpKUSXALccBuHpo+KDk3Oyu3hcekZmTRvabZh0Zse93S2yM62RuZ7saGhD6lBn3S7PjBqLg1pAA/7ouFbH53e1tIg29saeIQ67A0N2PgJLgFrCMPZnMBibEVuDY3LzcFxc1noIe863NyGA/JtvX9ge2uD7Opokvb6Gp7eCEhfcjWMlUTSBO7rA2PSPzb90Jd15mqffm5HL31uba6XHe2N5ixiYYRZeP30Z1/pC3DGJX0rvpmhgAaUwclpE1g0uCzGwv9fqQ+i0EdN9emNXVuaZEdbI/cOZHjMBG01fUni9YFxuT44KrOWnCV8kLG+QkDDi96/xQR2QTsSGQ+XijgGPBdYiSfl5tCYXO0fNY84B+/hZm8I9PUAO1obpbutwcyjoafjWcInoMfvndFJE7j1fqwgzCfkh2JxYVS2tTbIno5mcxMvc7/4oc4+0hXgjEu6Unxv0wLT80tytW9Urg6MiM5z4dqiYaWtoUa6Wxuku7VeqspKXSMIbb16lnB0elZuDU+ay0N6LLu4tNZVrd271d4keimJBYEgCBBcgtAFC8cwMD4tH/UOy+2hCWf+K/VBbSwrKTL3Duj9Lzr5F5PWBfuAX1hekZ7hCbk9PCH9E9OBn1PIa009e6iXPg90tTLvi9fYbD8tAYJLWkx8KV0BndtC/4V/sWfITNfP8olAU02FeWRab3zUpzi4fBSso2MlkTA33epj+vrEm95MzrImoC8a1SfmDmxrN8cuCwL5FCC45FPfsn3rUxdXeofN1OdT8+Gd28LLtuiTGq0N1dLVVG9mL9XHqFnyK7DxqgmdRE7nFJqYXcjvgAK6d73PRY/Zg9vazRlEbtsKaKMcGBbBxYEm+1GizmehZ1n0BXM6ORfLwwX0foEtjTXS1VwvWxpqRScCY/FXQF8rMTaz/qqJsSnzJnJ9/QTLwwV0lugj27eYJ484a8jRkg8Bgks+1C3bp55SP39rUC71DEkskbCsOm/L0fsHdM6X9kZ9e2+N1Fby7hhvxUX0cubY9LwMTMyYJ93C9qoJr33S2X5dVbkc3d4huzuaJMp8L+mQ8Z0cChBccojp4qY0tHxwvd/ciBv0F8wFuT8aYDbe3msCTFX52rTWLDkT0MCiZ1XWwsqsmcGZYzZz3uryUjm6o8O87oLwkrkja25egOCyeTPWWBfQS0If3Ogzl4j0DwWW7AXKS4vNmRe9AVJ/GmsqmcE0S1Y9Tken52Rkes6EFX2bc5he5pll+Z6uroH7+K4u2dvVwmUjT6XZ+KcFCC4cDxkJ6D0tZ2/0m3ta+EMgI8KHrqT3wDTXVkpLXbV583RLbaWUlRTnfkeWblHvVJmZXzJhRYOKBpfx2QXnH232ot165uX47i4zWR0T1XkhzDbvFSC4cExsWkBPr5+92S/nbvRLPMmZlk0DbmIFPQVfX1X+8dkXnY5d/5q5YO6PuBRbMU8Fjc8tmPtY9NLQ7KIdL/LcxGHj+1drK8rkqf3dZq4iFgS8FiC4eC1s2fb17c76uPOpqz2yvMKNuH62t6K0WBqrK6WhplwaqiulsapCairLnD9FH08kRd8lpGdUNLRs/Ojj+Sz+CTTVVMqzB3eYe7VYEPBSgODipa6F29bJ5d66eEvmlviv2Hy1Vx9Bra4oNSFGz77ok0i1FfpZ6syZGL1vZXphycwXpNPxT+pZltkFJo3L10G5vt/Opjp57uAOno7Lcx9s3z3BxfYO57A+/S/Z35+7JmMz8zncKpvKRkAvJek9Bia8VJZJXWW5eaNvVVmJ6BkaW+450Ju/5xZjMru0bILK9HpgmZpfkoVl996Dlc0x4+W6+gfK3s5WeeZAN+828hLa8W0TXBw/ANItX2/G/ePFm3JjYCzdVfiezwI6k2llaclacCkvlaryEqku089SE2TKS4olEgnHQ9Z6+UffGTS3uGzCin7OLcXM/SoaXGJxLlP6fHilvTu9/+qJPVvlyPZ2a4Jz2sXzRV8ECC6+MId7J3pfiz72fPpaL09lhKiVejamsrT44xCjwaWiVANMkQkx+uh1WXGRFBVG81aVTlSr7wjS+YAWl1fMpwaWjU9zlmVxmUtAeetQZjvWx6RfOrpbOhprM9sAayHwEAGCC4fHIwX0ZYm/PXOFPzweKRXsL+gZmdKiIhNY1oJLkQkuJUX6UyilxYXmU3+KolEpLIxKUTRiXrCXyVNMGnj1Ufl4Mvnxp55Jia0kZDmeMGdN9PdYPC6LMf1ZCy8LsRXR77GEW2BLY628/Ngec6yxIJBLAYJLLjUt3JZeInr1g6vm5XMsdgromZnioqgJNSa4FK8Hl2hkLbiYABM1s6Nq+NGbg/XeGf3RK086Z4qeOdH3/GhY2fjU0JJIJM0j8/oIvX7GE2uBRZ9I08+VeMKsz2KfgB4fJ3Z3yeO7ungho33tzWtFBJe88gd/5+du9st7l3t4+VzwW+XpCDWwRAsiUhApkIgUmM+NEKOh5dOBJWX+OiVJ/YXFaQG9QfzLx/ebeYhYEMiVAMElV5IWbmdqblF+eeqSuTGSBQEEEMhEYEdbo3zh2O6MLjdmsj/WsV+A4GJ/jzOqUP8L+o8XbsqlO0MZrc9KCCCAgAro/VFfPLZbtrc1AoJATgQILjlhtG8jw1Oz8u8nL/HYqX2tpSIEfBfQ2XS/+sQB5nbxXd7OHRJc7OxrVlXpvQmvnr0iNwfHs9oOKyOAAAIqoDd0v3B4p+zragUEgawFCC5ZE9q3gYGJGfnVyUvmMVYWBBBAIBcC+oLQrz19SEqLi3KxObbhsADBxeHm3690nVpd52zRdxKxIIAAArkS0D9snj+8Uw5sbcvVJtmOowIEF0cb/6CyB8dn5JenLpoJw1gQQACBXAo0VFfInz992MwVxIJApgIEl0zlLFxPnyTSsy03h7i3xcL2UhICeRfQuX9eOrJb9nS25H0sDCC8AgSX8PYu5yPXtz7/4p3zssJ06zm3ZYMIILAm0FJbZe51yec7suhFuAUILuHuX05H//r56/LRneGcbpONIYAAAp8W0CeMvnxin2xraQAGgYwECC4Zsdm3kr6B95/fOidLsbh9xVERAggESmBrc7185Yn95jFpFgQ2K0Bw2ayYpd8/c71PTl7psbQ6ykIAgSAJ6Es7v/7MIWmu5R1GQepLWMZCcAlLpzwcp76lV8+2TM8vebgXNo0AAgh8InBwW5s8f2gnJAhsWoDgsmky+1bQp4h+8/5l+wqjIgQQCKyAvjn6288dE/1kQWAzAgSXzWhZ+N3VVZF/P3VRekenLKyOkhBAIMgCLxzaKQe2MSFdkHsUxLERXILYFR/HNDW/JD9986zEeQTaR3V2hQACKtBaXy1ff/qwRCPcpMsRkb4AwSV9Kyu/efpar5y+esfK2igKAQSCLRCNRuQbzxyR5trKYA+U0QVKgOASqHb4Oxg9y/LTt87J1NyivztmbwgggMC6wJHtW+RzB7bjgUDaAgSXtKns+2Lf2JT88r2LsmpfaVSEAAIhEagqL5XvPHeUt0aHpF9BGCbBJQhdyNMYXj17Va71j+Zp7+wWAQQQWBP40vF9sqOtEQ4E0hIguKTFZN+XFmMr8g+vfyBLK8yUa193qQiBcAl0tzXKV47vC9egGW3eBAgu99DrZRMX7m+/NjAqr35wNW8HHjtGAAEENgRKi4vkuy88xpwuHBJpCRBcHA0uvzp1SXpGJtM6SPgSAggg4LXAS0d3y97OFq93w/YtECC4WNDEzZYwvxSTf3jjA9Gp/lkQQACBIAh0NtfJnz550Ikz3kHwDvMYCC5h7l6GY/+od1he//B6hmuzGgIIIJB7geLCqPynFx6T6vLS3G+cLVolQHCxqp3pFfOv712Q/rHp9L7MtxBAAAGfBJ4/tEMObmv3aW/sJqwCBJewdi7Dcetlop+8foYp/jP0YzUEEPBOoKOxVr729CHvdsCWrRAguHjUxqA+nXSlb0R+f+6aR1WzWQQQQCBzAb1c9Beff1wqy0oy3whrWi9AcPGoxUENLr8+fUluD/M0kUdtZ7MIIJClAE8XZQnowOoEFweavFHiUiwuP3n9fVle4Wkih9pOqQiESmBbS4N89Yn9oRozg/VXgODir3de93ZzaFx+8/7lvI6BnSOAAAIPE9DJ6L73+celrKQIKATuK0BwecCBEdRLPdkcx7ybKBs91kUAAb8Evnx8n2zn3UV+cYduPwQXR4JLPJGUv//D+7KwvBK6g5QBI4CAWwI6g67e68KCwP0ECC6OHBdDk7Pys7c/dKRaykQAgTALVJWVyPdefFwKo9Ewl8HYPRIguHgEG7TNnrxyR85c7w3asBgPAggg8BmBggKRbz57VFpqq9BB4LPHh/6d4Yl5vaWD5R4BW+5zWV0V+embZ2VsZp4eI4AAAqEQeGLvVjm+qysUY2WQ/gpwxuUh3rYEl7nFmLm/JZlK+Xt0sTcEEEAgQ4HWumr5xrNHeOlihn42r0Zwsbm767UxW64DTaZEBCwTKIpGzX0uzKJrWWNzUA7BJQeIQd/Eb89clhuD40EfJuNDAAEE7hJ4+bG9smtLEyoI3CVAcLH8gEgkk/J3r70vCzEeg7a81ZSHgHUC+zpb5EUei7aur9kW5FRwWV1dXS0o0PvV3VlGp+fkp2+ec6dgKkUAAWsEaipK5S8+f1yiEaf+tW1N/7wqxKngklpdlYhbuUXO3uiXdy/f9ur4YbsIIICAZwL67+vvfv4xqass92wfbDh8Ak4FF22Pa2dd/u29i9I3NhW+I5MRI4AAAiLywuGdcmBrGxYIfCzgXHDRsy5atAtXjGLxhPz4tdOinywIIIBAGAW2tzXIl4/ztugw9s6rMTsXXBQymUqtRiP2XzQdGJ+RX7x73qtjh+0igAACnguUlxTL979wnOn/PZcOzw6cDC6pVMqccbH9rMupq3fk/WtM8x+efxwZKQII3E/gO88fk6aaSnAQMAJOBhctfFX0kpHdd6r//J3zMjgxw6GOAAIIhFrg2YM75HB3e6hrYPC5E3A4uIiInnmJRHKnGaAtrSQS8qPfnZZYgvtbAtQWhoIAAhkIbG9rlC8f35fBmqxio4CzwcWcddEbdS19PHpockZ+9jb3t9j4Dy01IeCaQEVpsXz/pRMSjdr5H5qu9TPbep0OLjaHlzPXe+XklTvZHh+sjwACCORdQP/78rvPPy711cznkvdmBGAABJfVVXOnj233uzB/SwD+6WIICCCQMwHmc8kZZeg35HxwMWddLLtRN55Myo9ePS3LK/HQH6AUgAACCKiAvmxRX7rIggDBxcJjYGxmXv7pj2ctrIySEEDAVYHq8lL5zy8dd+61La72+2F1E1wsPCou3h6UP168aWFllIQAAq4K6HuL/vKlE1JVXuIqAXWvCxBcLDwUXv3gilwbGLOwMkpCAAGXBfSRaH00msVtAYKLZf3XR7z//g/vy8zCsmWVUQ4CCLgucHRHhzyzv9t1BufrJ7hYdgjML8XMixX1ZZIsCCCAgE0CrXXV8s1nj9hUErVkIEBwyQAtyKvcHpqQX7//UZCHyNgQQACBjASKCwvlv37xCSkuima0PivZIUBwsaOPH1fx7uXbcvZGv2VVUQ4CCCCwJvCtZ49KS10VHA4LEFwsa/4v3r0gA+PTllVFOQgggMCawHMHd8ghXrjo9OFAcLGo/clkSn746ikmnrOop5SCAAJ3C+zpaJYvHNsDi8MCBBeLmj81tyg/ef2MRRVRCgIIIHC3QF1luXzvxcdhcViA4GJR86/1j8qrZ69aVBGlIIAAAncLFEYi8l9ffkJKi4ugcVSA4GJR49+6dFPO3xq0qCJKQQABBD4r8OfPHJb2hhpoHBUguFjU+H95+0MZnpy1qCJKQQABBD4r8MyBbjm6vQMaRwUILpY0PpFKyQ9/e1Ji8YQlFVEGAgggcH+BXVua5eXHuEHX1eOD4GJJ56fmF+Unf+DGXEvaSRkIIPAQAW7QdfvwILhY0v/rA6Pyuw+4MdeSdlIGAgg8REBv0P3BK09KSVEhTg4KEFwsaToz5lrSSMpAAIG0BL713FFpqWUG3bSwLPsSwcWShv7bexekb4wZcy1pJ2UggMAjBF44vFMObG3DyUEBgosFTdc3Qf/t707JYmzFgmooAQEEEHi0wIFtbfLCoZ2P/iLfsE6A4GJBS+eXVuRHr56UVQtqoQQEEEAgHQF90aK+cJHFPQGCiwU97x2dkl+evGhBJZSAAAIIpCegN+b+1ctPSjQaSW8FvmWNAMHFglaeu9Ev71y+bUEllIAAAgikL/CXLx2Xmoqy9Ffgm1YIEFwsaONrZ6/K1f5RCyqhBAQQQCB9ga8+sV+2tTSkvwLftEKA4GJBG//pj2dlbGbegkooAQEEEEhf4Mm92+TxXZ3pr8A3rRAguIS8jclkSv73b9+TlUQy5JUwfAQQQGBzAkz9vzkvW75NcAl5J2cWluTvfv9+yKtg+AgggMDmBRqqK+S7Lzy2+RVZI9QCBJdQt0/k9vCE/Pr0RyGvguEjgAACmxcoKozKX73ypBRFo5tfmTVCK0BwCW3r1gZ+5nqfnLzSE/IqGD4CCCCQmcD3Xnxc9KWLLO4IEFxC3uvXzl6Tq/0jIa+C4SOAAAKZCXzlxH7pbuXJosz0wrkWwSWcfft41D9985yMTs+FvAqGjwACCGQm8PS+bjm2syOzlVkrlAIEl1C2bW3Q+o6i//2b9yQWT4S4CoaOAAIIZC6wt6NFXjq2O/MNsGboBAguoWvZJwNeWF6RH/7uZIgrYOgIIIBAdgK8syg7vzCuTXAJY9fWxzwwPi2/ePdCiCtg6AgggEB2AqXFhfJXrzwlkQLzxxmLAwIElxA3+VLPkLxx4UaIK2DoCCCAQHYCmld+8MUnpby0OLsNsXZoBAguoWnVZwf6zke35NzNgRBXwNARQACB7AW++bkj0lpfnf2G2EIoBAguoWjT/QepE8/pBHQsCCCAgMsCXzi2R/Z0NLtM4FTtBJcQt/v/vHFGJmcXQ1wBQ0cAAQSyFzixu0tO7Nma/YbYUrtYGwAAFvlJREFUQigECC6haNNnB5lKrcr//M27EufliiHtIMNGAIFcCfCyxVxJhmM7BJdw9Okzo5xfjsnf/u5USEfPsBFAAIHcCTTXVsm3nzuauw2ypUALEFwC3Z4HD25wYkZ+/s75kI6eYSOAAAK5EygtLpK/fuUp4Yno3JkGeUsElyB35yFju9o3Iq+duxbS0TNsBBBAIHcCBQUF8t++9JSUFBXmbqNsKbACBJfAtubhAzt9rVdOX70T0tEzbAQQQCC3At/9/GPSUFWR242ytUAKEFwC2ZZHD+r3567Llb7hR3+RbyCAAAIOCHz1iQOyraXegUopkeAS0mNAp/rXKf9ZEEAAAQREnju4Qw51t0PhgADBJaRN/vFrp2V2cTmko2fYCCCAQG4Fju3YIk/v357bjbK1QAoQXALZlocPKplMmTlcEslUCEfPkBFAAIHcC+xob5QvPb4v9xtmi4ETILgEriWPHtDswrL8+PenH/1FvoEAAgg4ItBSVy3fevaII9W6XSbBJYT97x2bkl++dzGEI2fICCCAgDcCFaUl8oOXn/Bm42w1UAIEl0C1I73BXO4dlj98eD29L/MtBBBAwAGBaCQi/+MrT4t+stgtQHAJYX9/efKi9I5OhXDkDBkBBBDwTkDPuOiZFxa7BQguIezv//dvb4Zw1AwZAQQQ8FZA31ek7y1isVuA4BLC/hJcQtg0howAAp4LfPWJ/bKtpcHz/bCD/AoQXPLrn9HeCS4ZsbESAghYLvDCkZ1yoKvN8iopj+ASwmOA4BLCpjFkBBDwXODEni45sXur5/thB/kVILjk1z+jvRNcMmJjJQQQsFzgwNY2eeHwTsurpDyCSwiPAYJLCJvGkBFAwHOB7tZG+coJZs/1HDrPOyC45LkBm939qat35P1rvZtdje8jgAAC1gu01lfLNz/H7Lm2N5rgErIOc7YlZA1juAgg4JtAdUWZfP+l477tjx3lR4Dgkh/3jPdKcMmYjhURQMBygaLCqPyPrzwj5g82FmsFCC4hay3BJWQNY7gIIOCbQEGBmOBSFI36tk925L8AwcV/86z2+OvTH8nt4YmstsHKCCCAgK0C/+WLT0hVGdP+29pfrYvgErLujs/Mi96g2zMyGbKRM1wEEEDAe4HvPH9Mmmoqvd8Re8ibAMElb/SZ73hsel6u9I/IxduDspr5ZlgTAQQQsE7ga08dko6mWuvqoqBPBAguIT0allficrFnSD640SeJZCqkVTBsBBBAILcCrzy+T3a2N+Z2o2wtUAIEl0C1Y/ODOXuj39zzMjw1u/mVWQMBBBCwTOCFw7tkf1er6I26LHYKEFws6Gvf2JRcujMkPcMTkuLakQUdpQQEEMhUYHdrdfwLx48UFhTwVHSmhkFfj+AS9A6lOb6J2QW5PTwul3tHZG4pluZafA0BBBCwS6C0IBn/6z95oaiAUy52NfZT1RBcLGrt6uqqXO0fNfe+jE7PWVQZpSCAAALpC/w/f/Ycp1vS5wrdNwkuoWvZowd8Z3RSrvSOSO/olMSTyUevwDcQQAABiwRO7O6SE3u2WlQRpXxagOBi6fEwObcgt4YmzBmYmYUlS6ukLAQQQOD+Av/vnz0HjaUCBBdLG6tl6WPSt4bG5UrfiPSPT1tcKaUhgAACdwsQXOw9Iggu9vb248qGJmfMpaM7o1OyGFtxoGJKRAABVwUiBQWyp7NFXjyyy1UC6+smuFjf4rUC5xaXTXC53DcsOvMuCwIIIGCbQGlxkRzubpe9nS1SyfuKbGvvx/UQXKxt7WcL06eOTHjpHZY7I5OSWmXSF4faT6kIWC3QWFMp+7ta5MDWNuFRaKtbzUsW7W7v/asbn12Qa/0jcnt4kht3XTwAqBkBiwTKS4ple1uDdDbVSXdrg0WVUcqDBDjj4uixoe860seluXHX0QOAshGwQKCuslwOb2+X7a2NUlZSZEFFlJCOAMElHSWLv2Nu3O1bm/NlYZkbdy1uNaUhYI1AJFIgXU11srujWXa2N1lTF4WkJ0BwSc/J6m/NLS1L3+i0XOkfkeFJXtZodbMpDoGQC1SUFsuhbe3m0lBTbWXIq2H4mQgQXDJRs3QdfVnj1b5R6R2bEr2UxIIAAggERUCfGNKzLO0NNbJ/a2tQhsU48iBAcMkDepB3OT2/JL2jk3JtYIz3HQW5UYwNAYcEmmurZPeWJtnaUi81FWUOVU6p9xMguHBcfEZAH5PWsy/X+kfN5/JKAiUEEEDAd4HS4kJzSUjvZdGzLTzm7HsLArlDgksg2xKMQenZF31h443BMRmZ4m3TwegKo0DADYGWuipz4+3W5nqpreQsixtdT69Kgkt6Ts5+S8++9I9Ny7WBUfPJKwOcPRQoHAFfBHRelo6mWtm9pVk6m2o5y+KLerh2QnAJV7/yNlp9w/RagBkTfYT6fovOzMup3Ly1iB0jEHqBtvoacy9LR1Od1FSUhr4eCvBGgODijau1W9W3TN8YGJO+8Wnz/qO7llWRVSG8WNt8CkPAI4Gq8lLpbKyVnRpaGms92gubtUWA4GJLJ32sY34pJibADI6ZszB3vfNIX39UIMLZFx8bwq4QCKmATiSnQUXvZdHLQhWlJSGthGH7KUBw8VPbsn3pDbu3hsfNrLsTswufOfuy9iYsFgQQQOCzAg3VFdLVXGem69cbcVkQSFeA4JKuFN+7r8BKPCH9EzNyU8++jE/LUoyJ6zhUEEDgwQL6TiE9y7Kjfe2yUHFhFC4ENiVAcNkUF19+kIA+Oq3B5ebQuAyMTwOFAAIIfEZgiwaWtkYTWHjEmQMkUwGCS6ZyrHdfgcGJGbml4WVi5rOXjzBDAAEnBfSy0JaGGtne1mim7GdBIBsBgks2eqx7XwF9z9HgxOx6gJnmrdMcJwg4KqAvRNzSUCvb2xpEz7aUFBU6KkHZuRQguORSk23dJaBzv+iZl9tDE+YzkUwihAACDggURiMmsHRrYGmo4f1CDvTczxIJLn5qO7qv0ek588ZpffpoeHLWUQXKRsANgdb6avO0kL5bSF+OyIJArgUILrkWZXv3FUimUqL3v9wenjQz737m8WncEEAg1AJ6H4vOfNvdWm/uY4lGIqGuh8EHV4DgEtzeWDkyfVxag0vPyKQJMrP3zr5rZdUUhYC9AtXlpdLWUCPdLfXms6y4yN5iqSwQAgSXQLTBvUHo6wIGJ2flzsiE+VxcXnEPgYoRCIfA+nzYdw9WX4bY1lAt21oapK2+WjTAsCDghwDBxQ9l9vFAgam5RRmcnJE75v6XGVleSaCFAAJBEliPLfqHhf5aWlworXU1srWlzlwaqq8qD9JoGYsDAgQXB5ochhLHZubNjbt3RifN50qCJ5DC0DfGaL+A/iGhb30vLopKS+3ajbd6A25TTaX9xVNhIAUILoFsi7uD0vcf6T0w+hTSyOScxHmE2t2DgcrzLmACS2HUXArqaKqV1rpqnhTKe1cYAMGFYyBwAvpm6eH1AKNvn9YwQ4AJXJsYkOUCRYVRaa+vkS2NNeYpoabaSingzamWdz0c5RFcwtEnJ0eZWl01oUXPwAyMz8jI1KzEE0lznZ0FAQS8EdDAomdW9H1CGliaNbAU8Kp3b7TZaiYCBJdM1FjHVwENMKNTcya49I/PyPDUrMTi3MTraxPYmfUCOh1/S12VCSwaXPR3Aov1bQ9lgQSXULbNzUHrJSRzE+/UnJhLSNOzovPCsCCAQOYCZSVF0lK7Flha9B6WOi4JZa7Jmn4IEFz8UGYfORfQAKOXkQbGp0VfKTC3FMv5PtggAmEU0ICfzpmSqrISc6OtvvxQz67wlFAYu+3mmAkubvbdmqon5xZNcDEBZmZedF4YFgRcE9Cwsj7NykZoeeBNKXVV5dJcU2kCiwYX5mFx7WgJf70El/D3kApEzKsDNMDoawTGpudldGZO1v5dzoKAvQKpZCKl1RUURPQ0iz7zExX9//fEFj0Do2FFnwxau+G2iplu7T0srK+M4GJ9i90qcCm2ImMzC+ZJpNHpeXNPzPIK98G4dRTYXe2qLqmkXhDSaJ7SmBKJFESkwLzU8K43G5YWF5lLQPpkkM5yq8GFdwnZfXy4UB3BxYUuO1hjMpmSsdm14DI0MSvjs/MyPb/0IImNczM88+ngsRKGkvVS0KrIaoGGFp15f/1GloKInmUxzyrfFVhqK8uksbrSvEtIg4v+8LbmMHSaMaYjQHBJR4nvhFpgan5RxmcWzKsENMBMzC58MqGdRpb12LJaYH7VD/1zoSCdGxxDDcPgAy1gIkpBgYaUjXGatwaZw3RtXpW7wkpRNCqNNRUmsOiU/Pp7XSXvEQp0kxlcRgIEl4zYWCmMAvro9MTcggku+kTS5NyCzC3G9D9fzZ8NGzc4amgxf11AiAljn8M85vVj0JRQoKHFROn1O1b0Ppa1Q/KupaaiTBqqK6S1rsqEFg0seomIBQFbBQgutnaWuh4qoE8j6RNIeilpen5RJucXzb0wyaSJMZJKrT2lsRFipODjCXu5nMSxlVOBjceXzef9ptS/zxGnk8VpWNEfnYNl4/ecDoyNIRBQAYJLQBvDsPwR0Bl49d6XtctJ8zIxtyiTs/MST6bMGZi1H00w6+NZ+0PEnLL3Z4TsxXqBjaPpEUeVXrpsqCqX+uoK81SQ/q6BhbMr1h8hFHiPAMGFQwKBdQGdxE4DzMTMgrmxd3J2wYSa9RsjP3EitnDM+Cigl4J0rhUNKXqTrf6uf48FAVcFCC6udp66Hyigl4k0wOjlJD0Lo/fC6O/MzstB45eAzmqrE8VpSGk0YaXC/B7hZYd+tYD9BFiA4BLg5jC0/AusJBIypZeS1kOM+X1+UeZ5xUD+m2PZCDSs1FaWS50+ylxTaZ4I0rCib2tmQQCBTwQILhwNCKQpoDfvTi9ocFkyTybpTb16KUln7WVBIBOBmopSc9lHQ4peCtL5V/R3vfmWBQEE7i9AcOHIQCADgY2bejXImHthFpZkRn/mlyW5amZhZ0HgMwI6CZwGlVoNLJVl0lBVYT7rKsqkmLDCEYNAWgIEl7SY+BICDxaIJ5Iys7gsM/Nr4UUfrZ5dWJaZxSXRuWNY3BYoKymSmvIy0bMret/KWnDRvy6Twuhdc8i5DUX1CKQpQHBJE4qvIZCuwMzCsswuaohZNpeT9FLSxk8iydmYdB09/d7aFPp3LeszJWf9zJiGkery0o9/9L6VjUtC+vdZEEAgOwGCS3Z+rI3AQwViK3GZXYqZMzCzS2tnZfRTZ+ydX4xxWcmn4+feGWk3Jn37ePcbc79lEFv08k9lWYlUlZdIddnaJSD9rK5YCy/cr+JTk9mNMwIEF2daTaFBEFhYXjFnX+aWlk1w0UtM+oTSxk88mQzCMG0bw9rJlY2p8+83CfImphPUdwJpUNn4qSkvlcryEqnSsFJeKhWlxbb5UQ8CgRIguASqHQzGNYH55bUzL+ZzKbZ2JmY5JhpwFtY/g2jy6TMYOr5Av5Ayy3d/axCpKC0xgaSydO3MigktpSUmsOgnCwII+CdAcPHPmj0h8EgBfeR6XkPL0lp40TCzEFsLMYuxuCwur8hibOWR2/H8C59+YbF5GaAdr0AoLymW8tJiKS8pWgsrJcUmpJjwYsJKMVPse35wsQMEHi5AcOEIQSDAAjqLrwYVDS8boUUDjT6tpH9/aSVuftfAo49o32/Rf8jvvRE1pyWHMLbofSf6jh994qesuEg0sOjvGlA2wouGFv3rQJ9Nymkj2RgC4RAguISjT4wSgY8F9DKNBhY9A7O0Hl6W9XcNMSsaYhIfBxkNMyvxhCRS608zmRdGfvaJGht59emekqIiKS0uNDfIalDR3zWo6E/pemgp07Ms+ntJ0f3fzmwjDjUhEGIBgkuIm8fQEfi0QDKV+ji0LMcTok80meCSSJpPnW9GPz/9o39P//d4PBmqJ5wikQIpLoxKUWGh6M2yxUVR89caUIoL14JKyUZgMb8XSenGWZbiItH1WRBAIJwCBJdw9o1RI7ApAQ01GyFl4yxMLJ6UeGIt2Oj/pk80rX2mJJFMis45oz+67sanXrrSvzafq2ufegYnpWdxNs7m6C/3XJ4y/6Ip0P8rMJde9F2B+sJA/V1DRLQgsvYZ+eRTz5joX+vn2k9UiqIR8+4e/X0tuKz96O8682xJYaEJMRpcdF0WBBCwT4DgYl9PqQiBjAQ2AooGmEQiZS4vaYBJaoBJaYBZldS9nyawbASXT8LLfYPL+tNHGlpMYNkILgUaWDTAaFD55LNQ/3o9sOjvhYURc3ZFfzhjklGLWQkBKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBDgODiRp+pEgEEEEAAASsECC5WtJEiEEAAAQQQcEOA4OJGn6kSAQQQQAABKwQILla0kSIQQAABBBBwQ4Dg4kafqRIBBBBAAAErBAguVrSRIhBAAAEEEHBD4P8Ckxno0i5nV7QAAAAASUVORK5CYII=';
    BEGIN
        INSERT INTO users_bio (id, user_uuid, phone, address_main, address_city, address_zip, address_country, date_birth, gender, image)
        VALUES(uuid_generate_v4(), pass_userId, pass_phone, pass_addressMain, pass_addressCity, pass_addressZip, pass_addressCountry, pass_dateBirth, pass_gender, image_user);
    END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_user_settings(pass_userId uuid, pass_settingPublic boolean, pass_settingHeader1 varchar, pass_settingHeader2 varchar, pass_settingConsent boolean, pass_settingAllowContact boolean)
returns void as $$
    BEGIN
        INSERT INTO users_setting (id, user_uuid, setting_public, setting_header1, setting_header2, setting_consent, setting_allow_contact)
        VALUES(uuid_generate_v4(), pass_userId, pass_settingPublic, pass_settingHeader1, pass_settingHeader2, pass_settingConsent, pass_settingAllowContact);
    END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_user_confirmation_email(pass_userId uuid, pass_status boolean)
returns table(user_id uuid) as $$
    BEGIN
        INSERT INTO confirmation_emails(id, user_uuid, status)
        VALUES(uuid_generate_v4(), pass_userId, pass_status);

        return query SELECT id FROM confirmation_emails WHERE user_uuid = pass_userId;
    END;
$$
LANGUAGE plpgsql;