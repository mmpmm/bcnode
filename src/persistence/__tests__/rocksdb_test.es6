/**
 * Copyright (c) 2017-present, blockcollider.org developers, All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow-disable
 */

const { RocksDb } = require('../')

const rimraf = require('rimraf')

const dataDir = '_data_test'

describe('RocksDb', () => {
  it('can instantiate self', () => {
    expect(new RocksDb()).toBeInstanceOf(RocksDb)
  })

  test('put', done => {
    const db = new RocksDb(dataDir)

    const key = 'msg'
    const value = 'hello'

    db.open()
      .then(() => db.put(key, value))
      .then(() => db.get(key))
      .then((res) => {
        expect(res).toEqual(value)
        return db.del(key)
      })
      .then((res) => {
        expect(res).toEqual(true)
        return db.close()
      })
      .then(() => {
        done()
      })
      .catch((err) => {
        expect(err).toEqual(null)
      })
  })

  afterAll(done => {
    rimraf(dataDir, () => {
      done()
    })
  })
})
